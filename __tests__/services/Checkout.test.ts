import { describe, expect, test } from "bun:test";
import { Checkout } from "../../src/services/Checkout";
import { Product } from "../../src/models/Product";
import { Banana } from "../../src/products/Banana";
import { Apple } from "../../src/products/Apple";
import { Store } from "../../src/services/Store";

const bootstrapApp = () => {
  const store = new Store();

  store.addProduct(new Banana());
  store.addProduct(new Apple());

  const banana = store.getProductByName("banana");
  const apple = store.getProductByName("apple");

  const shoppingCart: Product[] = [];

  banana && shoppingCart.push(banana);
  apple && shoppingCart.push(apple);

  return { store, shoppingCart };
};

describe("Checkout tests", () => {
  test("should return total value", () => {
    const { store, shoppingCart } = bootstrapApp();

    const checkout = new Checkout(shoppingCart, "SF", store);
    expect(checkout.getTotalValue().toFixed(2)).toBe("226.24");
  });

  test("should finish sale and record it on store", () => {
    const { store, shoppingCart } = bootstrapApp();

    const checkout = new Checkout(shoppingCart, "SF", store);
    checkout.finish();

    const currentDate = new Date();
    const offset = currentDate.getTimezoneOffset();
    const parsedCurrentDate = new Date(
      currentDate.getTime() - offset * 60 * 1000
    );
    const stringDate = parsedCurrentDate.toISOString().split("T")[0];

    expect(store.getSalesByDate(stringDate)).toEqual([
      {
        date: parsedCurrentDate,
        productList: [
          {
            name: "banana",
            value: 2,
          },
          {
            name: "apple",
            value: 200,
          },
        ],
        total: 226.24000000000004,
      },
    ]);
  });
});
