import { describe, expect, test } from "bun:test";
import { Banana } from "../../src/products/Banana";
import { Apple } from "../../src/products/Apple";
import { Store } from "../../src/services/Store";
import { Sale } from "../../src/models/Sale";

describe("Store tests", () => {
  test("should be able to add, retrieve and delete product", () => {
    const store = new Store();

    const banana = new Banana()
    const apple = new Apple()

    store.addProduct(banana);
    store.addProduct(apple);

    expect(store.getProductByName("banana")).toBe(banana)
    expect(store.getProductByName("apple")).toBe(apple)

    store.deleteProductByName("banana");
    store.deleteProductByName("apple");
   
    expect(store.getProductByName("banana")).toBe(undefined)
    expect(store.getProductByName("apple")).toBe(undefined)
  });

  test("should be able to make a sale and get its record", () => {
    const store = new Store();

    const currentDate = new Date()
    const offset = currentDate.getTimezoneOffset()
    const parsedCurrentDate = new Date(currentDate.getTime() - (offset*60*1000))
    const stringDate = parsedCurrentDate.toISOString().split('T')[0]
    
    const sale = new Sale(
      [ new Banana(), new Apple()],
      123,
      parsedCurrentDate)

    store.makeSale(stringDate, sale)

    expect(store.getSalesByDate(stringDate)).toEqual([sale])
  })   
});

