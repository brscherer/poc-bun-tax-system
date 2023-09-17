import { Product } from "../models/Product";
import { Sale } from "../models/Sale";

export class Store {
  private salesRecord: Map<string, Sale[]> = new Map()
  private productsRecord: Map<string, Product> = new Map()
  
  getSalesByDate(date: string): Sale[] | undefined {
    return this.salesRecord.get(date)
  }
  
  formatSales(sales: Sale[]): string {
    const USDollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return sales.reduce((result, sale) => {
      result += `\n\n
        Products: ${sale.getProductList().map((product: Product) => product.getName()).join(", ")},
        Total Value: ${USDollar.format(sale.getTotal())}
        Date: ${sale.getDate()}
      `
      return result
    }, '')
  }

  addProduct(product: Product) {
    this.productsRecord.set(product.getName(), product)
  }

  getProductByName(productName: string): Product | undefined {
    return this.productsRecord.get(productName)
  }

  deleteProductByName(productName: string) {
    this.productsRecord.delete(productName)
  }

  makeSale(date: string, sale: Sale) {
    const sales = this.salesRecord.get(date)?.length ? this.salesRecord.get(date) as Sale[] : []
    this.salesRecord.set(date, [...sales, sale])
  }
}