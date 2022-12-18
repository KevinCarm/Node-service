import express from "express";
import validator from "validator";
import MongooseProduct from "../../models/Product";
import MongooseUser from "../../models/User";
import { Product } from "../graphqlSchemasTypes";

const createProduct = async (
    args: any,
    req: express.Request
): Promise<Product> => {
    const isAuth = req.headers["isAuth"];
    if (!isAuth || isAuth === "false") {
        const error: Error = new Error(
            JSON.stringify({ message: "No authenticated", code: 401 })
        );
        throw error;
    }

    if (
        validator.isEmpty(args.productInput.name) ||
        validator.isLength(args.productInput.name, { min: 5 })
    ) {
        const error: Error = new Error(
            JSON.stringify({
                message:
                    "Bad request, name must be not empty and at least 5 characters",
                code: 400,
            })
        );
        throw error;
    }
    if (
        validator.isEmpty(args.productInput.description) ||
        validator.isLength(args.productInput.description, { min: 5 })
    ) {
        const error: Error = new Error(
            JSON.stringify({
                message:
                    "Bad request, description must be not empty and at least 5 characters",
                code: 400,
            })
        );
        throw error;
    }
    if (!validator.isNumeric(args.productInput.price)) {
        const error: Error = new Error(
            JSON.stringify({
                message: "Bad request, price must be a number",
                code: 400,
            })
        );
        throw error;
    }
    if (!validator.isNumeric(args.productInput.quantity)) {
        const error: Error = new Error(
            JSON.stringify({
                message: "Bad request, quantity must be a number",
                code: 400,
            })
        );
        throw error;
    }

    const userId = req.headers["userId"];
    const existingUser = await MongooseUser.findById(userId);
    if (!existingUser) {
        const error: Error = new Error(
            JSON.stringify({ message: "User not found", code: 404 })
        );
        throw error;
    }

    const newProduct = new MongooseProduct({
        name: args.productInput.name,
        description: args.productInput.description,
        price: args.productInput.price,
        quantity: args.productInput.quantity,
        creator: existingUser._id,
    });

    const savedProduct = await newProduct.save();
    existingUser.products.push(savedProduct);
    await existingUser.save();

    return {
        _id: String(savedProduct._id),
        name: savedProduct.name,
        description: savedProduct.description,
        price: savedProduct.price,
        quantity: savedProduct.quantity,
        creator: { ...existingUser._doc },
    };
};

export default createProduct;
