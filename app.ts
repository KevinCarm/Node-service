import mongoose from "mongoose";
import express from "express";

const app: express.Application = express();
const PORT: number = 3000;

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
