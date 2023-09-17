import { TaxFactory } from "../factories/TaxFactory"
import { Product } from "../models/Product"
import { Sale } from "../models/Sale"
import { YearTaxes } from "../models/YearTax"
import { Store } from "./Store"

export class Checkout {
  private year: YearTaxes = new TaxFactory().getCurrentYearTax()
  private productList: Product[]
  private state: string
  private store: Store

  constructor(productList: Product[], state: string, store: Store) {
    this.productList = productList
    this.state = state
    this.store = store
  }

  getTotalValue(): number {
    return this.productList.reduce((acc, product) => {
      return acc + product.getValue() * (1 + this.year.getStateTax(this.state) / 100)
    }, 0)
  }

  finish() {
    const currentDate = new Date()
    const offset = currentDate.getTimezoneOffset()
    const parsedCurrentDate = new Date(currentDate.getTime() - (offset*60*1000))
    const stringDate = parsedCurrentDate.toISOString().split('T')[0]
    
    const sale = new Sale(this.productList, this.getTotalValue(), parsedCurrentDate)
    this.store.makeSale(stringDate, sale)
  }
}