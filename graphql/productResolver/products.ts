import express from "express";
import MongooseProduct from "../../models/Product";
import { Product } from "../graphqlSchemasTypes";

class ErrorException extends Error {
    constructor(message: string) {
        super(message);
    }
}

const products = async (
    _args: any,
    req: express.Request
): Promise<Product[]> => {
    const isAuth = req.headers["isAuth"];
    if (isAuth === "false") {
        const error: ErrorException = new ErrorException("No authenticated");
        throw error;
    }

    const products = await MongooseProduct.find().populate("creator");
    const finalList: Product[] = products.map(p => {
        const product: Product = {
            _id: String(p._id),
            name: p.name,
            price: p.price,
            description: p.description,
            quantity: p.quantity,
            creator: p.creator,
        };
        return product;
    });

    return finalList;
};

export default products;
