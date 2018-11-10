import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database'
import { AppUtility } from '../class/AppUtility';
import { Subject } from 'rxjs/Subject';
import { Order } from '../class/Order';

declare var swal: any; //SweetAlert2 typings definition

@Injectable()
export class OrderService {

    constructor(
        private af:AngularFireAuth,
        private afDb: AngularFireDatabase
    ) {

    }

    //Query data from firebase
    private _queryOrders(): Observable<Order[]> {

        this.af.authState.subscribe(
            user => {
                if (!user) {
                    swal("Error", "Please login ... ", "error");
                }
            },
            error => { }
        );

        return this.afDb.list<Order>('/Demo/orders').valueChanges();
    }

    public getById(id: string): Observable<Order> {
        return this._queryOrders().map(arr => arr.filter(ord => ord.id === id)[0]);
    }

    public getByCustomer(email: string): Observable<Order[]> {
        return this._queryOrders().map(arr => arr.filter(ord => ord.customer === email));
    }

    //Create new product
    public create(ord: Order) {
        //Set UUID to id
        let item$ = this.afDb.object('/Demo/orders/' + ord.id);
        return item$.set(ord);
    }

    //Remove a product
    public remove(id: string) {
        return this.afDb.object('/Demo/orders/' + id).remove();
    }


}

