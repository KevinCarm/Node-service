import MongoUser from "../../models/User";
import MongooseRole from "../../models/Role";
import { User } from "../graphqlSchemasTypes";
import validator from "validator";
import bcrypt from "bcryptjs";
import express from "express";

const registerUser = async (args: any, req: express.Request): Promise<User> => {
    const isAuth = req.headers["isAuth"];
    if (isAuth === "false") {
        const error: Error = new Error(
            JSON.stringify({
                message: "No authenticated",
                code: 401,
            })
        );
        throw error;
    }
    if (!validator.isEmail(args.userInputData.email)) {
        const error: Error = new Error(
            JSON.stringify({
                message: "Invalid email, enter a valid email",
                code: 400,
            })
        );
        throw error;
    }
    if (validator.isEmpty(args.userInputData.name)) {
        const error: Error = new Error(
            JSON.stringify({
                message: "Invalid name, enter a valid name",
                code: 400,
            })
        );
        throw error;
    }
    if (!validator.isLength(args.userInputData.password, { min: 5 })) {
        const error: Error = new Error(
            JSON.stringify({
                message: "Invalid password, it must be att least 5 characters",
                code: 400,
            })
        );
        throw error;
    }

    const existingUser = await MongoUser.findOne({
        email: args.userInputData.email,
    });
    if (existingUser) {
        const error: Error = new Error(
            JSON.stringify({
                message: "Email already exists",
                code: 400,
            })
        );
        throw error;
    }
    const roleUser = await MongooseRole.findOne({ name: "ROLE_USER" });

    const hashedPassword = await bcrypt.hash(args.userInputData.password, 12);
    const user = new MongoUser({
        name: args.userInputData.name,
        email: args.userInputData.email,
        password: hashedPassword,
        roles: [roleUser],
        products: [],
    });
    const savedUser = await user.save();

    return { ...savedUser._doc };
};

export default registerUser;
