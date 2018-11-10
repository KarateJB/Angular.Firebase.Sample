import { ShopItem } from '../class/ShopItem';

export interface IOrder {
    id: string;
    customer: string;
    status: string;
    date: string;
    items: ShopItem[];
}
