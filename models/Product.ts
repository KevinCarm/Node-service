import mongoose from "mongoose";
import { Schema } from "mongoose";

const Product: mongoose.Schema = new Schema({
    name: {
        type: Schema.Types.String,
        require: true,
    },
    description: {
        type: Schema.Types.String,
        require: true,
    },
    price: {
        type: Schema.Types.Number,
        require: true,
    },
    quantity: {
        type: Schema.Types.Number,
        require: true,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

export default mongoose.model("Product", Product);
