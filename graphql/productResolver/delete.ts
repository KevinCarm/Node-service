import express, { query } from "express";
import validator from "validator";
import MongooseProduct from "../../models/Product";
import MongooseUser from "../../models/User";
import { Product } from "../graphqlSchemasTypes";

const deleteProduct = async (
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

    if (validator.isEmpty(args.productId)) {
        const error: Error = new Error(
            JSON.stringify({
                message: "Bad request, product no provided",
                code: 400,
            })
        );
        throw error;
    }

    const existingProduct = await MongooseProduct.findById(
        args.productId
    ).populate("creator");

    if (!existingProduct) {
        const error: Error = new Error(
            JSON.stringify({
                message: "Product not found",
                code: 404,
            })
        );
        throw error;
    }

    const user = await MongooseUser.findById(
        existingProduct.creator._id
    ).populate("roles");

    const isAdmin = user?.roles.find((r: any) => r.name === "ROLE_ADMIN");
    if (isAdmin) {
        await existingProduct.delete();
        return { ...existingProduct._doc };
    }

    const userId = req.headers["userId"];
    if (String(userId) !== String(existingProduct.creator._id)) {
        const error: Error = new Error(
            JSON.stringify({
                message: "Unauthorized",
                code: 401,
            })
        );
        throw error;
    }

    await existingProduct.delete();

    return { ...existingProduct._doc };
};

export default deleteProduct;
