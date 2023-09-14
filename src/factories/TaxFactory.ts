import { YearTaxes } from "../models/YearTax";
import { Year2022Taxes } from "../taxes/Year2022Taxes";
import { Year2023Taxes } from "../taxes/Year2023Taxes";

export class TaxFactory {
  YEAR_TAX: { [key: string]: any } = {
    "2022": Year2022Taxes,
    "2023": Year2023Taxes,
  }

  getCurrentYearTax() {
    const currentYear = new Date().getFullYear().toString()
    const taxInstance = this.YEAR_TAX[currentYear] ?? Year2023Taxes
    console.log(taxInstance)
    return taxInstance instanceof YearTaxes ? new this.YEAR_TAX[currentYear]() : false
  }
}