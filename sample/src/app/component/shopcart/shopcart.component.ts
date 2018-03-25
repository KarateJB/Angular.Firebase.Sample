import { User } from '@firebase/auth-types';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, Pipe, PipeTransform, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store, State } from '@ngrx/store';
import { PUSH, PULL, CLEAR } from '../../ngrx/shopcart.action';
import { SAVE, CANCEL, COMPLETE } from '../../ngrx/order.action';
import { IShopCart } from '../../interface/IShopCart';
import { IOrder } from '../../interface/IOrder';
import { Order } from '../../class/Order';
import { ShopCart } from '../../class/ShopCart';
import { ShopItem } from '../../class/ShopItem';
import { IStore } from '../../interface/IStore';
import { AppUtility } from '../../class/AppUtility';


declare var swal: any; //SweetAlert2 typings definition


@Component({
    selector: 'shop-cart',
    providers: [],
    templateUrl: './shopcart.component.html',
    //styleUrls: ['/app/component/Basic/Product/Product-index.component.css']
})

export class ShopcartComponent implements OnInit {

    private shopcart$: Observable<IShopCart>;
    private order$: Observable<IOrder>;
    private states: string[] = [];
    private loginUser: User; //Firebase User
    private isDisableSendOrder: boolean = true;

    constructor(
        private router: Router,
        private af: AngularFireAuth,
        private store: Store<IStore>
    ) {
        //Get the reducer
        this.shopcart$ = this.store.select<IShopCart>(x => x.shopcart);
        this.order$ = this.store.select<IOrder>(x=>x.order);
    }

    ngOnInit() {
        this.af.authState.subscribe(
            user => {
                this.loginUser = user;
                this.isDisableSendOrder = false;
            },
            error => console.trace(error)
          );
    }

    private sendOrder() {

        this.shopcart$.subscribe(data => {
            let date = new Date();
            let orderItem: Order = {
                id: AppUtility.generateUUID(),
                customer: this.loginUser.email, 
                status: 'Saving',
                date: date.toLocaleDateString().concat(' ', date.toLocaleTimeString()),
                items: data.items
            };

            this.store.dispatch({ type: SAVE, payload: orderItem });

            this.order$.subscribe(ord => {
                this.states.push(ord.status);
            });
        });


        
    }

    private goToProducts() {
        this.router.navigate(['Product/Index']);
    }
}

