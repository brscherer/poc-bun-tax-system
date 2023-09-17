export abstract class YearTaxes {
  abstract taxes: { [key: string]: number }

  getStateTax(state: string): number {
    return this.taxes[state]
  }
}