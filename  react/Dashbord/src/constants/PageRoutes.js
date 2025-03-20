const home = "/";
const category = "/category/:category?";

const commonRoutes = {
    home: home,
    category: category,
};

const cart = "/cart";

const cartRoutes = {
    cart: cart,
};

const product = "/product/:id";

const productRoutes = {
    product: product,
};

export const pageRoutes = {
    commonRoutes,
    cartRoutes,
    productRoutes
};