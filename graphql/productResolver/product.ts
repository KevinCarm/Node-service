import { Product } from "../graphqlSchemasTypes";
import express from "express";
import MongooseProduct from "../../models/Product";

const product = async (args: any, req: express.Request): Promise<Product> => {
    const isAuth = req.headers["isAuth"];
    const id = args.productId;

    if (isAuth === "false") {
        console.log("no auth");
        const error: Error = new Error(
            JSON.stringify({ message: "No authenticated", code: 401 })
        );
        throw error;
    }

    if (!id || id === "") {
        const error: Error = new Error(
            JSON.stringify({
                message: "Bad request, No product provided",
                code: 400,
            })
        );
        throw error;
    }

    const existingProduct = await MongooseProduct.findById(id).populate(
        "creator"
    );
    if (!existingProduct) {
        const error: Error = new Error(
            JSON.stringify({ message: "Product not found", code: 404 })
        );
        throw error;
    }

    return {
        _id: String(existingProduct._id),
        name: existingProduct.name,
        description: existingProduct.description,
        price: existingProduct.price,
        quantity: existingProduct.quantity,
        creator: existingProduct.creator,
    };
};

export default product;
