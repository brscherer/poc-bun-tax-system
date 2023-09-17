import { expect, test } from "bun:test";
import { TaxFactory } from "../../src/factories/TaxFactory";
import { Year2023Taxes } from "../../src/taxes/Year2023Taxes";

test("should return instace that represents current year", () => {
  expect(new TaxFactory().getCurrentYearTax()).toStrictEqual(
    new Year2023Taxes()
  );
});
