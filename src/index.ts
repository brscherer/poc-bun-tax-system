import { Product } from "./models/Product";
import { Apple } from "./products/Apple";
import { Banana } from "./products/Banana";
import { Checkout } from "./services/Checkout";
import { Store } from "./services/Store";
import { getCurrentDateFormatted } from "./utils/selectors";

const store = new Store()

store.addProduct(new Banana())
store.addProduct(new Apple())


const shoppingCart: Product[] = []

shoppingCart.push(store.getProductByName("banana") )
shoppingCart.push(store.getProductByName("apple"))

const firstCheckout = new Checkout(shoppingCart, "SF", store)
firstCheckout.finish()

const server = Bun.serve({
  port: 3000,
  fetch(req) {
    return new Response(store.formatSales(store.getSalesByDate(getCurrentDateFormatted())));
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);
