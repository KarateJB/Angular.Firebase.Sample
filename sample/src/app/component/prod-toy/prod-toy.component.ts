import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Product } from '../../class/Product';
import { ProductService } from '../../service/product.service';
import { ProdBookingComponent } from '../prod-booking/prod-booking.component';
import { IShopCart } from '../../interface/IShopCart';
import { ShopCart } from '../../class/ShopCart';
import { ShopItem } from '../../class/ShopItem';
import { ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr';


declare var swal: any; //SweetAlert2 typings definition


@Component({
    selector: 'product-toys',
    templateUrl: './prod-toy.component.html'
    //styleUrls: ['/app/component/Basic/Product/Product-index.component.css']
})

export class ProdToyComponent implements OnInit {
    private title: string;
    private toastrOptions: ToastOptions;
    private toys: Product[];

    private itemNumbers: any;
    private shopcart: Observable<IShopCart>;

    constructor(
        private router: Router,
        private productService: ProductService,
        private store: Store<IShopCart>,
        private toastr: ToastsManager,
        private vRef: ViewContainerRef) {

        this.title = "Toys";
        this.itemNumbers = {};
        this.toastr.setRootViewContainerRef(vRef);

        this.productService = productService;

        //Get the reducer
        this.shopcart = this.store.select(x => x); 
    }

    ngOnInit() {
        this.initToys();
    }

    //Initialize books
    private initToys() {
        // this.productService.getToys().then(data => {
        //     this.toys = data;

        //     //Use shopping cart to update data
        //     this.shopcart.subscribe(cart => {
        //         this.toys.forEach(item => {
        //             let storeItem = cart.items.find(x => x.id === item.Id);
        //             if (!storeItem) {
        //                 this.itemNumbers[item.Id] = 0;
        //             }
        //             else {
        //                 this.itemNumbers[item.Id] = storeItem.count;
        //             }
        //         });
        //     })
        // })
    }

    private setShopCart(data: ShopCart) {
        this.toastr.info(data.cnt + ' items, total $' + data.sum, 'Shopping Cart', this.toastrOptions);
    }



}

