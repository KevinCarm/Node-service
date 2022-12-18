import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";

import graphqlResolver from "./graphql/resolver";
import grapgqlSchema from "./graphql/schema";
import isAuth from "./middleware/isAuth";

const app: express.Application = express();
const PORT: number = 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "*");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

app.use(isAuth);

app.use(
    "/api/v1",
    graphqlHTTP({
        schema: grapgqlSchema,
        rootValue: graphqlResolver,
        graphiql: true,
        customFormatErrorFn: err => {
            const error: { message: string; code: number } = JSON.parse(
                err.message
            );
            return {
                message: error.message,
                status: error.code,
            };
        },
    })
);

mongoose
    .set("strictQuery", false)
    .connect(
        "mongodb+srv://root:Swordartonline_1@cluster0.vt7arkw.mongodb.net/node_server?retryWrites=true&w=majority"
    )
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    });
