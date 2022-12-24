import { Role } from "../graphqlSchemasTypes";
import MongooseRole from "../../models/Role";
import express from "express";

const roles = async (_args: any, req: express.Request): Promise<Role[]> => {
    const isAuth = req.headers["isAuth"];
    if (isAuth === "false") {
        const error: Error = new Error(
            JSON.stringify({ message: "No authenticated", code: 401 })
        );
        throw error;
    }
    const roles = await MongooseRole.find();
    console.log(roles);
    const roleList: Role[] = roles.map(r => {
        return { _id: String(r._id), name: String(r.name) };
    });

    return roleList;
};

export default roles;
