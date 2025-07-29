import { error } from "console";
import { Request, Response, NextFunction } from "express";

export class CustomError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorHandler = (
    err: Error | CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    next()
    console.error(err);
    res.status(500).json({message: "something went wrong"})
}