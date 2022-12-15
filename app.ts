import mongoose from "mongoose";
import express from "express";
import { graphqlHTTP } from "express-graphql";

import graphqlResolver from "./graphql/resolver";
import grapgqlSchema from "./graphql/schema";

const app: express.Application = express();
const PORT: number = 3000;

app.use(
    "/api/v1",
    graphqlHTTP({
        schema: grapgqlSchema,
        rootValue: graphqlResolver,
        graphiql: true,
        customFormatErrorFn: err => {
            return {
                message: err.message,
                locations: err.locations,
                path: err.path,
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
