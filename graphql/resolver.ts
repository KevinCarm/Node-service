import products from "./productResolver/products";
import registerUser from "./userResolver/create";
import login from "./userResolver/login";
import product from "./productResolver/product";
import createProduct from "./productResolver/create";
import deleteProduct from "./productResolver/delete";
import updateProduct from "./productResolver/update";

const query = {
    registerUser: registerUser,
    login: login,
    products: products,
    product: product,
    createProduct: createProduct,
    deleteProduct: deleteProduct,
    updateProduct: updateProduct,
};

export default query;
