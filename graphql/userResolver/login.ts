import { LoginResponse } from "../graphqlSchemasTypes";
import MongooseUser from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY: string = "com.kev.node.service";

class ErrorException extends Error {
    constructor(message: string) {
        super(message);
    }
}

const login = async (args: any): Promise<LoginResponse> => {
    const email: string = args.email;
    const password: string = args.password;

    const existingUser = await MongooseUser.findOne({ email: email });
    if (!existingUser) {
        const error: ErrorException = new ErrorException(
            "The email does not exist"
        );
        throw error;
    }

    const passwordIsEqual: boolean = await bcrypt.compare(
        password,
        existingUser.password
    );

    if (!passwordIsEqual) {
        const error: ErrorException = new ErrorException(
            "Password does not match"
        );
        throw error;
    }

    const token = jwt.sign(
        { userId: String(existingUser._id), email: existingUser.email },
        SECRET_KEY,
        { expiresIn: "5h" }
    );

    return { userId: String(existingUser._id), token: token };
};

export default login;
