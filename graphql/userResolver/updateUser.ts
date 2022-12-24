import express from "express";
import MongooseUser from "../../models/User";
import validator from "validator";
import { User } from "../graphqlSchemasTypes";
import bcrypt from "bcryptjs";

const updateUser = async (args: any, req: express.Request): Promise<User> => {
    const isAuth = req.headers["isAuth"];
    if (!isAuth || isAuth === "false") {
        const error: Error = new Error(
            JSON.stringify({ message: "No authenticated", code: 401 })
        );
        throw error;
    }

    const userId = req.headers["userId"];
    const reqUserId = args.userId;
    if (String(userId) !== String(reqUserId)) {
        const error: Error = new Error(
            JSON.stringify({
                message: "Unauthorized",
                code: 401,
            })
        );
        throw error;
    }

    const { name, email, password } = args.userInputData;

    if (validator.isEmpty(name) || !validator.isLength(name, { min: 5 })) {
        const error: Error = new Error(
            JSON.stringify({
                message:
                    "Bad request, name must not be empty and least 5 characters",
                code: 400,
            })
        );
        throw error;
    }
    if (!validator.isEmail(email)) {
        const error: Error = new Error(
            JSON.stringify({
                message: "Bad request, email is not a valid formart",
                code: 400,
            })
        );
        throw error;
    }

    if (
        validator.isEmpty(password) ||
        !validator.isLength(password, { min: 5 })
    ) {
        const error: Error = new Error(
            JSON.stringify({
                message:
                    "Bad request, password must not be empty and least 5 characters",
                code: 400,
            })
        );
        throw error;
    }

    const existingUser = await MongooseUser.findById(reqUserId).populate(
        "products"
    );
    if (!existingUser) {
        const error: Error = new Error(
            JSON.stringify({
                message: "User not found",
                code: 404,
            })
        );
        throw error;
    }

    const encryptPassword = await bcrypt.hash(password, 12);

    existingUser.name = name;
    existingUser.email = email;
    existingUser.password = encryptPassword;

    const result = await existingUser.save();

    return { ...result._doc };
};

export default updateUser;
