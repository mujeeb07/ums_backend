import { Request, Response, NextFunction } from "express";


class ErrorHanlder extends Error {
    statusCode: number;
    message: string;

    constructor(statusCode: number, message: string) {
        super();
        this.statusCode = statusCode;
        this.message = message
    }
}

const handleError = (err: ErrorHanlder, req: Request, res: Response, next: NextFunction) => {
    const { statusCode, message } = err;
    console.log("Hanlde Error:",err)
    res.status(statusCode).json({
        message:message
    })
}

export { ErrorHanlder, handleError };