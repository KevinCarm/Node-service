import jwt from "jsonwebtoken";
import express from "express";
import { User } from "../graphql/SchemasTypes";
const SECRET_KEY: string = "com.kev.node.service";

const isAuth = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): void => {
    const authHeader: string | undefined = req.get("Authorization");
    if (!authHeader) {
        req.headers["isAuth"] = "false";
        return next();
    }
    const token: string = authHeader.split(" ")[1];
    let decodedToken: string | jwt.JwtPayload;
    try {
        decodedToken = jwt.verify(token, SECRET_KEY);
    } catch (err) {
        req.headers["isAuth"] = "false";
        return next();
    }
    type TokenDecoded = {
        userId: String;
        email: String;
    };
    const user: TokenDecoded = decodedToken as TokenDecoded;

    req.headers["isAuth"] = "true";
    req.headers["userId"] = user.userId.toString();
    next();
};

export default isAuth;
