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
    const lastTax = Object.keys(this.YEAR_TAX).length - 1
    const taxInstance = this.YEAR_TAX[currentYear] ?? this.YEAR_TAX[lastTax]
    return new taxInstance() instanceof YearTaxes ? new taxInstance() : false
  }
}