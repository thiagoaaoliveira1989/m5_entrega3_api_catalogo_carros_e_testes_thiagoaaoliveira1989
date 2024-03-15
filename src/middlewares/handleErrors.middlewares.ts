import { NextFunction, Request, Response } from "express";
import { AppError } from "../error/AppError";
import { ZodError } from "zod";

class HandleErrorMiddleware {
    static execute(err: Error, req: Request, res: Response, next: NextFunction) {
        if (err instanceof AppError) {
            return res.status(err.statusCode).json({ message: err.message });
        }

        if (err instanceof ZodError) {
            return res.status(400).json({ message: err.message })
        }

        console.log(err.message, err.name);

        return res.status(500).json({ error: "Internal server error" });
    }
}

export const handleErrors = HandleErrorMiddleware.execute;