export class Order implements IOrder{
    id: string;
    customer: string;
    status: string;
    date: string;
    items: ShopItem[];

    constructor() {
        this.date = new Date().toLocaleDateString();
        this.items = [];
    }
}