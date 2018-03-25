import { User } from '@firebase/auth-types';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, Pipe, PipeTransform, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { last } from 'rxjs/operators';
import { Store, State } from '@ngrx/store';
import { PUSH, PULL, CLEAR } from '../../ngrx/shopcart.action';
import { SAVE, SAVED, CANCEL, COMPLETE } from '../../ngrx/order.action';
import { IShopCart } from '../../interface/IShopCart';
import { IOrder } from '../../interface/IOrder';
import { Order } from '../../class/Order';
import { ShopCart } from '../../class/ShopCart';
import { ShopItem } from '../../class/ShopItem';
import { IStore } from '../../interface/IStore';
import { AppUtility } from '../../class/AppUtility';
import { ToastsManager } from 'ng2-toastr';

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
        private store: Store<IStore>,
        private toastr: ToastsManager,
        private vRef: ViewContainerRef
    ) {
        this.toastr.setRootViewContainerRef(vRef);

        //Get the reducer
        this.shopcart$ = this.store.select<IShopCart>(x => x.shopcart);
        this.order$ = this.store.select<IOrder>(x => x.order);
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
                status: SAVE,
                date: date.toLocaleDateString().concat(' ', date.toLocaleTimeString()),
                items: data.items
            };

            this.store.dispatch({ type: SAVE, payload: orderItem });

            //Output states
            this.order$.subscribe(ord => {
                this.states.push(ord.status);

                if (ord.status === SAVED) {
                    //Msg
                    this.toastr.info('Your order is saved!');
                    //Clean store
                    this.store.dispatch({ type: CLEAR });
                }
            });
        });
    }

    private goToProducts() {
        this.router.navigate(['Product/Index']);
    }
}

