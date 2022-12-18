import express from "express";
import MongooseProduct from "../../models/Product";
import { Product } from "../graphqlSchemasTypes";


const products = async (
    _args: any,
    req: express.Request
): Promise<Product[]> => {
    const isAuth = req.headers["isAuth"];
    if (isAuth === "false") {
        const error: Error = new Error(
            JSON.stringify({ message: "No authenticated", code: 401 })
        );
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
