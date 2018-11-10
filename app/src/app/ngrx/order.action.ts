import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Action, ActionReducer } from '@ngrx/store';
import { IOrder } from '../interface/IOrder';
import { Order } from '../class/Order';
import { ShopItem } from '../class/ShopItem';
import { OrderAction } from '../class/OrderAction';

export const SAVE = 'SAVE';
export const SAVED = 'SAVED';
export const CANCEL = 'CANCEL';
export const CANCELLED = 'CANCELLED';
export const COMPLETE = 'COMPLETE';

export const orderReducer: ActionReducer<IOrder> = (state: Order = new Order(), action: OrderAction) => {
    switch (action.type) {

        case SAVE:
            state = action.payload;
            return state;

        case SAVED:
            state = action.payload;
            return state;

        case CANCEL:
            return state;

        case CANCELLED:
            return state;

        case COMPLETE:
            state = action.payload;
            return state;

        default:
            return state;
    }
}

