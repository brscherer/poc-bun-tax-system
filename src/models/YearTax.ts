export abstract class YearTaxes {
  private taxes: { [key: string]: number } = {}

  constructor(taxes: { [key: string]: number }) {
    this.taxes = taxes
  }

  getStateTax(state: string): number {
    return this.taxes[state]
  }
}