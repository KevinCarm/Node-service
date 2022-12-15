import mongoose from "mongoose";
import { Schema } from "mongoose";

const User: mongoose.Schema = new Schema({
    name: {
        type: Schema.Types.String,
        require: true,
    },
    email: {
        type: Schema.Types.String,
        require: true,
    },
    password: {
        type: Schema.Types.String,
        require: true,
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
});

export default mongoose.model("User", User);
