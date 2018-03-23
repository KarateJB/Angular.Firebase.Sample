import { Action } from "@ngrx/store";
import { Order } from "./Order";

export class OrderAction implements Action {

    constructor(
        public type: string, 
        public payload: Order) {
    }
}