import products from "./productResolver/products";
import registerUser from "./userResolver/create";
import login from "./userResolver/login";
import product from "./productResolver/product";
import createProduct from "./productResolver/create";
import deleteProduct from "./productResolver/delete";
import updateProduct from "./productResolver/update";
import updateUser from "./userResolver/updateUser";
import roles from "./roleResolver/roles";
import addAdmin from "./roleResolver/addAdmin";

const query = {
    registerUser: registerUser,
    login: login,
    products: products,
    product: product,
    createProduct: createProduct,
    deleteProduct: deleteProduct,
    updateProduct: updateProduct,
    updateUser: updateUser,
    roles: roles,
    addAdmin: addAdmin,
};

export default query;
