import { Product } from "../graphqlSchemasTypes";
import MongooseProduct from "../../models/Product";
import validator from "validator";
import express from "express";

const updateProduct = async (
    args: any,
    req: express.Request
): Promise<Product> => {
    const isAuth = req.headers["isAuth"];
    const userId = req.headers["userId"];
    if (!isAuth || isAuth === "false") {
        const error: Error = new Error(
            JSON.stringify({ message: "No authenticated", code: 401 })
        );
        throw error;
    }

    const productId = args.productId;
    const { name, description, price, quantity } = args.productInput;

    if (validator.isEmpty(productId)) {
        const error: Error = new Error(
            JSON.stringify({
                message: "Bad request, product no provided",
                code: 400,
            })
        );
        throw error;
    }

    if (validator.isEmpty(name) || !validator.isLength(name, { min: 5 })) {
        const error: Error = new Error(
            JSON.stringify({
                message:
                    "Bad request, name must be not null and at least 5 characters",
                code: 400,
            })
        );
        throw error;
    }

    if (
        validator.isEmpty(description) ||
        !validator.isLength(description, { min: 5 })
    ) {
        const error: Error = new Error(
            JSON.stringify({
                message:
                    "Bad request, description must be not null and at least 5 characters",
                code: 400,
            })
        );
        throw error;
    }

    if (!validator.isNumeric(String(price))) {
        const error: Error = new Error(
            JSON.stringify({
                message: "Bad request, price must be a number",
                code: 400,
            })
        );
        throw error;
    }

    if (!validator.isNumeric(String(quantity))) {
        const error: Error = new Error(
            JSON.stringify({
                message: "Bad request, quantity must be a number",
                code: 400,
            })
        );
        throw error;
    }

    const existingProduct = await MongooseProduct.findById(productId);
    if (!existingProduct) {
        const error: Error = new Error(
            JSON.stringify({
                message: "Product not found",
                code: 404,
            })
        );
        throw error;
    }

    if (String(userId) !== String(existingProduct.creator._id)) {
        const error: Error = new Error(
            JSON.stringify({
                message: "Unauthorized",
                code: 401,
            })
        );
        throw error;
    }

    existingProduct.name = name;
    existingProduct.description = description;
    existingProduct.price = price;
    existingProduct.quantity = quantity;

    const result = await existingProduct.save();
    if (!result) {
        const error: Error = new Error(
            JSON.stringify({
                message: "An error happend, try again",
                code: 500,
            })
        );
        throw error;
    }

    return { ...result._doc };
};

export default updateProduct;
