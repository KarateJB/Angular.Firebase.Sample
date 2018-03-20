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
    private _queryProducts() {

        this.af.authState.subscribe(
            user => {
                if (!user) {
                    swal("Error", "Please login ... ", "error");
                }
            },
            error => { }
        );

        return this.afDb.list('/Demo/products').valueChanges().
            map(x => {
                return <Product[]>x;
            });
    }

    //Get Product types list
    public getProductTypes() {
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

    public getByKey(key: string) {
        return this.afDb.object('/Demo/products/' + key).valueChanges();
    }

    public get(id: string) {
        let arr = this._queryProducts().subscribe(data => {
            return data.filter(x => x.Id == id);
        });
    }

    //Get books
    public getBooks() {

    }
    //Get toys
    public getToys() {

    }
    //Get toys
    public getMusic() {

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
