import { Product } from "../models/Product";
import { Sale } from "../models/Sale";

export class Store {
  private salesRecord: Map<string, Sale[]> = new Map()
  private productsRecord: Map<string, Product> = new Map()
  
  getSalesByDate(date: string): Sale[] {
    return this.salesRecord.get(date)
  }
  
  formatSales(sales: Sale[]): string {
    return sales.reduce((result, sale) => {
      result += `\n\n
        Products: ${sale.getProductList().reduce((r, product) => { r += `${product.getName()}, ` }, '')},
        Total Value: ${sale.getTotal()}
        Date: ${sale.getDate()}
      `
      return result
    }, '')
  }

  addProduct(product: Product) {
    this.productsRecord.set(product.getName(), product)
  }

  getProductByName(productName: string): Product {
    return this.productsRecord.get(productName)
  }

  deleteProductByName(productName: string) {
    this.productsRecord.delete(productName)
  }

  makeSale(date: string, sale: Sale) {
    const sales = this.salesRecord.get(date)?.length ? this.salesRecord.get(date) as Sale[] : []
    console.log({ sales })
    this.salesRecord.set(date, [...sales, sale])
  }
}