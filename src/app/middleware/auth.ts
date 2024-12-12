import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import config from "../config";

const JWT_SECRET = config.jwt_secret as string;

const authUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization as string;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new Error("Access denied. No token provided or invalid format.");
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as any).user = decoded;
        next();
    } catch (error) {
        next(error)
        
    }
};
const onlyAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as any).user;
        if (!user || !user.role) {
            throw new Error("Access denied. No token provided or invalid format.");
        }
        if (user.role !== "admin") {
            throw new Error("Access denied only admin");
        }
        next();
    } catch (error) {
        next(error)
    }
};




export const Auth = { authUser, onlyAdmin };
