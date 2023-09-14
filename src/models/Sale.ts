import { Product } from "./Product";

export class Sale {
  private productList: Product[];
  private total: number;
  private date: Date;

  constructor(productList: Product[], total: number, date: Date) {
    this.productList = productList
    this.total = total
    this.date = date
  }
 
  getProductList(): Product[] {
    return this.productList
  }
  getTotal(): number {
    return this.total
  }
  getDate(): Date {
    return this.date
  }
}
