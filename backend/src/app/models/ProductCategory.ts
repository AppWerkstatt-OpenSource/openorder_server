import {Product} from './product'

export class ProductCategory {
    id: number;
    name : string;
    productImage: string;
    products = [];

    public addProduct(product : Product){
        this.products.push(product);
    }
}