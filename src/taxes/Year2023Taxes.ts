import { YearTaxes } from "../models/YearTax"

export class Year2023Taxes extends YearTaxes {
  constructor() {
    super({
      SF: 12,
      NY: 16
    })
  }
}