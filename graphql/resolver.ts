import registerUser from "./userResolver/create";
import login from "./userResolver/login";

const query = {
    registerUser: registerUser,
    login: login,
};

export default query;
