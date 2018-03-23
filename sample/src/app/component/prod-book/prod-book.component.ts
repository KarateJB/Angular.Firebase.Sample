import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import { Product } from '../../class/Product';
import { ProductService } from '../../service/product.service';
import { ProdBookingComponent } from '../prod-booking/prod-booking.component';
import { IShopCart } from '../../interface/IShopCart';
import { ShopCart } from '../../class/ShopCart';
import { ShopItem } from '../../class/ShopItem';
import { ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { Order } from '../../class/Order';

const PROD_TYPE = 'Book';

@Component({
    selector: 'product-books',
    templateUrl: './prod-book.component.html'
})


export class ProdBookComponent implements OnInit {

    private title: string;
    private toastrOptions: ToastOptions;
    private books: Product[];

    private itemNumbers: any;
    private shopcart: Observable<IShopCart>;

    constructor(
        private router: Router,
        private productService: ProductService,
        private store: Store<IShopCart>,
        private toastr: ToastsManager,
        private vRef: ViewContainerRef) {

        this.title = "Books";
        this.itemNumbers = {};
        this.toastr.setRootViewContainerRef(vRef);

        this.productService = productService;

        //Get the reducer
        this.shopcart = this.store.select(x => x);
    }

    ngOnInit() {
        this.initBooks();
    }


    //Initialize books
    private initBooks() {
        this.productService.getByType(PROD_TYPE).subscribe(data => {
            this.books = data;

            //Use shopping cart to update data
            this.shopcart.subscribe(cart => {
                this.books.forEach(item => {

                    if (cart.items) {
                        let storeItem = cart.items.find(x => x.id === item.Id);
                        if (!storeItem) {
                            this.itemNumbers[item.Id] = 0;
                        }
                        else {
                            this.itemNumbers[item.Id] = storeItem.count;
                        }
                    }
                });
            })

        })
    }

    private setShopCart(data: ShopCart) {
        this.toastr.info(data.cnt + ' items, total $' + data.sum, 'Shopping Cart', this.toastrOptions);
    }


}


