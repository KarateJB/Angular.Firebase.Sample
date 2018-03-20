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
        private adb: AngularFireDatabase) {

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

        return this.adb.list('/Demo/products');
        // return this.af.database.object('/Demo/products');
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
        return this.adb.object('/Demo/products/' + key).valueChanges();
    }

    public getAll(){
        let arr = this._queryProducts().valueChanges().
        map( x => {
            return <Product[]> x; 
        }).subscribe(data =>{
            return data;
        });
    }

    public get(id: string) {
        let arr = this._queryProducts().valueChanges().subscribe(data =>{
            console.log(data);
            // return data.filter(x=>x.Id==id);
        });
        // return new Promise<Product>(
        //     resolve => {
        //         //From Firebase
        //         this._queryProducts().subscribe(data => {
        //             if (data) {
        //                 let prod = data.find(x => x.Id == id);
        //                 resolve(prod);
        //             }
        //             else {
        //                 resolve(null);
        //             }

        //         })

        //     });
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
        // //Set UUID to id
        // prod.Id = AppUtility.generateUUID();

        // var getPromise = new Promise(
        //     resolve => {
        //         let itemObservable = this._queryProducts();
        //         //console.log(itemObservable);
        //         let current = null;
        //         itemObservable.subscribe(value => {
        //             current = value;
        //             current.push(prod);
        //             resolve(current);
        //         })
        //     }).then((newValue) => {
        //         //console.log(newValue);
        //         let itemObservable = this._queryProducts();
        //         itemObservable.update(newValue);
        //     });

        // //Could also use the following codes to append a new object to database with specified key!
        // //var getPromise = new Promise(
        // //    resolve => {
        // //        let itemObservable = this.af.database.object('/Demo/products/' + prod.Id);
        // //        itemObservable.set(prod);
        // //        resolve();
        // //    });

        // return getPromise;
    }

    //Update a product
    public update(prod: Product) {

        // var getPromise = new Promise(
        //     resolve => {
        //         let itemObservable = this._queryProducts();
        //         let current: Product[] = [];
        //         itemObservable.subscribe(value => {
        //             current = value;
        //             for (let i = 0; i < current.length; i++) {
        //                 let item = current[i];
        //                 if (item.Id == prod.Id) {
        //                     item.Price = prod.Price;
        //                     item.Title = prod.Title;
        //                     item.TypeId = prod.TypeId;
        //                     item.Type = prod.Type;
        //                 }
        //             }

        //             resolve(current);
        //         })
        //     }).then((newValue) => {
        //         let itemObservable = this._queryProducts();
        //         itemObservable.update(newValue);
        //     });

        // return getPromise;
    }

    //Remove all products
    public removeAll() {
        // var getPromise = new Promise(
        //     resolve => {
        //         let itemObservable = this._queryProducts();
        //         itemObservable.remove();
        //     })
        // return getPromise;
    }

    //Remove a product
    public remove(prod: Product) {
        // var promise = new Promise(
        //     resolve => {
        //         let itemObservable = this._queryProducts();
        //         let current: Product[] = [];
        //         itemObservable.subscribe(value => {
        //             current = value;

        //             //Remove item
        //             for (let i = 0; i < current.length; i++) {
        //                 let item = current[i];
        //                 if (item.Id == prod.Id) {
        //                     var index = current.indexOf(item);
        //                     current.splice(index, 1);
        //                 }
        //             }

        //             resolve(current);
        //         })
        //     }).then((newValue: Product[]) => {

        //         let itemObservable = this._queryProducts();
        //         let prods: Product[] = [];
        //         newValue.forEach(item => {
        //             prods.push(item);
        //         });

        //         itemObservable.set(prods); //PS. Cannot use update() here.
        //     });

        // return promise;
    }
}
