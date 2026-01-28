import { Request, Response } from "express";

export class ErrorBase extends Error {

    readonly status: number;
    readonly message: string;

     constructor(message: string = "Internal Server Error", status: number = 500) {
        super(message);
        this.message = message;
        this.status = status;
    }

    sendResponse(req: Request, res: Response) {
        res.status(this.status).json({
            status: this.status,
            message: this.message,
            method: req.method,
            path: req.originalUrl
        });
    }
}