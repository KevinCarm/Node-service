import products from "./productResolver/products";
import registerUser from "./userResolver/create";
import login from "./userResolver/login";

const query = {
    registerUser: registerUser,
    login: login,
    products: products,
};

export default query;
