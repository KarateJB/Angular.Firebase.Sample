import { ActionReducer } from '@ngrx/store';
import { IOrder } from "./IOrder";
import { IShopCart } from "./IShopCart";
import { Action } from 'rxjs/scheduler/Action';
import { ShopItem } from '../class/ShopItem';

export interface IStore {
    shopcart: any;
    order: any;
}
