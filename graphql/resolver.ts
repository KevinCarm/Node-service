import products from "./productResolver/products";
import registerUser from "./userResolver/create";
import login from "./userResolver/login";
import product from "./productResolver/product";

const query = {
    registerUser: registerUser,
    login: login,
    products: products,
    product: product,
};

export default query;
