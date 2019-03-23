import { Data } from '@angular/router';

export class Item {
    _id: string;
    name: string;
    sku: string;
    code: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}