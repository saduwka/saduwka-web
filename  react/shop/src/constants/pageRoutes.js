
const product = "/product/:id";

const productRoutes = {
    product: product,
}

const cart = "/cart";

const cartRoutes = {
    cart: cart,
}

const home = "/";
const category = "/category/:category?";

const commonRoutes = {
    home: home,
    category: category,
}
  

export const pageRoutes = {
    commonRoutes,
    cartRoutes,
    productRoutes,
}