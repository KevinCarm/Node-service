import MongooseUser from "../../models/User";
import MongooseRole from "../../models/Role";
import { User } from "../graphqlSchemasTypes";
import express from "express";
import validator from "validator";

const addAdmin = async (args: any, req: express.Request): Promise<User> => {
    const { userId, roleId } = args;
    const loggedUserId = req.headers["userId"];
    const isAuth = req.headers["isAuth"];

    if (!isAuth || isAuth === "false") {
        const error: Error = new Error(
            JSON.stringify({ message: "No authenticated", code: 401 })
        );
        throw error;
    }
    if (validator.isEmpty(userId)) {
        const error: Error = new Error(
            JSON.stringify({ message: "User not provided", code: 400 })
        );
        throw error;
    }
    if (validator.isEmpty(roleId)) {
        const error: Error = new Error(
            JSON.stringify({ message: "Role not provided", code: 400 })
        );
        throw error;
    }

    const loggedUser = await MongooseUser.findById(loggedUserId).populate(
        "roles"
    );
    const isAdmin = loggedUser?.roles.find((r: any) => r.name === "ROLE_ADMIN");
    if (!isAdmin) {
        const error: Error = new Error(
            JSON.stringify({
                message: "Unauthorized, you have not an admin role",
                code: 401,
            })
        );
        throw error;
    }

    const newAdmin = await MongooseUser.findById(userId);
    if (!newAdmin) {
        const error: Error = new Error(
            JSON.stringify({ message: `User not found ${userId}`, code: 404 })
        );
        throw error;
    }
    const roleAdmin = await MongooseRole.findOne({ name: "ROLE_ADMIN" });
    newAdmin.roles.push(roleAdmin);
    await newAdmin.save();

    await newAdmin.populate("roles");

    return { ...newAdmin._doc };
};

export default addAdmin;
