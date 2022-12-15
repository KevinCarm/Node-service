import MongoUser from "../../models/User";
import { User } from "../graphqlSchemasTypes";
import validator from "validator";
import bcrypt from "bcryptjs";

class ErrorException extends Error {
    constructor(message: string) {
        super(message);
    }
}

const registerUser = async (args: any): Promise<User> => {
    if (!validator.isEmail(args.userInputData.email)) {
        const error: ErrorException = new ErrorException(
            "Invalid email, enter a valid email"
        );
        throw error;
    }
    if (validator.isEmpty(args.userInputData.name)) {
        const error: ErrorException = new ErrorException(
            "Invalid name, it must not be empty"
        );
        throw error;
    }
    if (!validator.isLength(args.userInputData.password, { min: 5 })) {
        const error: ErrorException = new ErrorException(
            "Invalid password, it must be att least 5 characters"
        );
        throw error;
    }

    const existingUser = await MongoUser.findOne({
        email: args.userInputData.email,
    });
    if (existingUser) {
        const error: ErrorException = new ErrorException(
            "User email already exists"
        );
        throw error;
    }
    const hashedPassword = await bcrypt.hash(args.userInputData.password, 12);
    const user = new MongoUser({
        name: args.userInputData.name,
        email: args.userInputData.email,
        password: hashedPassword,
        products: [],
    });
    const savedUser = await user.save();

    return { ...savedUser._doc };
};

export default registerUser;
