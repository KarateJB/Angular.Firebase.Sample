import { Action } from "@ngrx/store";
import { Order } from "./order";

export class OrderAction implements Action {

    constructor(
        public type: string, 
        public payload: Order) {
    }
}