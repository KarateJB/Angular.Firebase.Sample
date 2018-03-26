import { OrderService } from './../../service/order.service';
import { User } from '@firebase/auth-types';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, Pipe, PipeTransform, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store, State } from '@ngrx/store';
import { IShopCart } from '../../interface/IShopCart';
import { IOrder } from '../../interface/IOrder';
import { Order } from '../../class/Order';
import { IStore } from '../../interface/IStore';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  private order$: Observable<IOrder>;
  private loginUser: User; //Firebase User
  private myOrders$: Observable<Order[]>;

  constructor(
    private router: Router,
    private af: AngularFireAuth,
    private store: Store<IStore>,
    private orderService: OrderService
) {
    //Get the reducer
    this.order$ = this.store.select<IOrder>(x=>x.order);
}


  ngOnInit() {
    this.af.authState.subscribe(
      user => {
        this.loginUser = user;
        this._getOrders(this.loginUser.email);
      },
      error => console.trace(error)
    );
  }

  private _getOrders(userEmail: string){
    this.myOrders$ = this.orderService.getByCustomer(userEmail);
  }
}
