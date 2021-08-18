import { Action } from "@ngrx/store";
import { ShopItem } from "./ShopItem";

export class ShopcartAction implements Action {

    constructor(
        public type: string, 
        public payload: ShopItem) {
    }
}