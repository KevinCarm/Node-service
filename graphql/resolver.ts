import products from "./productResolver/products";
import registerUser from "./userResolver/create";
import login from "./userResolver/login";
import product from "./productResolver/product";
import createProduct from "./productResolver/create";

const query = {
    registerUser: registerUser,
    login: login,
    products: products,
    product: product,
    createProduct: createProduct,
};

export default query;
