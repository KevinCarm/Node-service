import mongoose from "mongoose";
import { Schema } from "mongoose";

const Role: mongoose.Schema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
    },
});

export default mongoose.model("Role", Role);
