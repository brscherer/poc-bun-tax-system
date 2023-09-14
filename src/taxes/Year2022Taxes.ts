import { YearTaxes } from "../models/YearTax"

export class Year2022Taxes extends YearTaxes {
  constructor() {
    super({
      SF: 10,
      NY: 14
    })
  }
}