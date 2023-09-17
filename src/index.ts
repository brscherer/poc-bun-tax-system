import { Product } from "./models/Product";
import { Apple } from "./products/Apple";
import { Banana } from "./products/Banana";
import { Checkout } from "./services/Checkout";
import { Store } from "./services/Store";
import { getCurrentDateFormatted } from "./utils/selectors";


const server = Bun.serve({
  port: 3000,
  fetch(req) {
    const store = new Store();

    store.addProduct(new Banana());
    store.addProduct(new Apple());

    const banana = store.getProductByName("banana")
    const apple = store.getProductByName("apple")

    const shoppingCart: Product[] = [];

    banana && shoppingCart.push(banana);
    apple && shoppingCart.push(apple);

    const firstCheckout = new Checkout(shoppingCart, "SF", store);
    firstCheckout.finish();

    const sale = store.getSalesByDate(getCurrentDateFormatted())

    return new Response(
      sale && store.formatSales(sale)
    );
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);
