import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database'
import { Product } from '../class/Product';
import { ProductType } from '../class/ProductType';
import { AppUtility } from '../class/AppUtility';
import { EnumEx } from '../enum/EnumEx';
import { ProdTypeEnum } from '../enum/ProdTypeEnum';
import { Subject } from 'rxjs/Subject';

declare var swal: any; //SweetAlert2 typings definition

@Injectable()
export class ProductService {

    private httpOptions: RequestOptions;
    constructor(
        private af: AngularFireAuth,
        private afDb: AngularFireDatabase) {

    }

    //Query data from firebase
    private _queryProducts(): Observable<Product[]> {

        this.af.authState.subscribe(
            user => {
                if (!user) {
                    swal("Error", "Please login ... ", "error");
                }
            },
            error => { }
        );

        return this.afDb.list<Product>('/Demo/products').valueChanges();
    }

    //Get Product types list
    public getProductTypes(): ProductType[] {
        let prodTypes: ProductType[] = [];

        //Get name-value pairs from ProductTypeEnum
        let prodTypeEnumList = EnumEx.getNamesAndValues(ProdTypeEnum);

        //Convert name-value pairs to ProductType[]
        prodTypeEnumList.forEach(pair => {
            let prodType = { 'id': pair.value.toString(), 'name': pair.name };
            prodTypes.push(prodType);
        });

        return prodTypes;
    }

    public getByKey(key: string): Observable<Product> {
        return this.afDb.object<Product>('/Demo/products/' + key).valueChanges().take(1).map(x=><Product>x);
    }

    public getById(id: string): Observable<Product> {
        return this._queryProducts().map(arr => arr.filter(prod => prod.Id === id)[0]);
    }

    //Get products by type: Toy, Book, Music
    public getByType(type: string): Observable<Product[]> {
       return this._queryProducts().map(arr => arr.filter(x => x.Type == 'Book'));
    }

    //Create new product
    public create(prod: Product) {
        //Set UUID to id
        let itemObservable = this.afDb.object('/Demo/products/' + prod.Id);
        return itemObservable.set(prod);
    }

    //Update a product
    public update(prod: Product) {

        return new Promise(
            resolve => {
                let item = this.afDb.object('/Demo/products/' + prod.Id);
                item.set(prod);
                resolve();
            }
        )
    }

    //Remove all products
    public removeAll() {
        return this.afDb.object('/Demo/products').remove();
    }

    //Remove a product
    public remove(prod: Product) {
        return this.afDb.object('/Demo/products/' + prod.Id).remove();
    }
}
