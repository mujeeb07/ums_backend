import jwt, { Jwt } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface Payload {
    id: string;
    role: string;
}

export const protect = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    try {
        const token = req.cookies?.token;
        if(!token) {
            res.status(401).json({ message: "Not authorized, no token" });
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as Payload
        req.user = decoded as Payload
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
        return;
    }
};

export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Access denied, admin only" });
        return;
    }
};

export const userOnly = (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === "user") {
        next();
    } else {
        res.status(403).json({ message: "Access denied, user only" });
        return;
    }
};


