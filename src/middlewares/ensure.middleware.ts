import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";
import { AppError } from "../error/AppError";
import { prisma } from "../database";

class EnsureMiddleware {
    public validBody = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
        try {
            const validatedBody = schema.parse(req.body);

            const unknownProperties = Object.keys(req.body).filter(key => !validatedBody.hasOwnProperty(key));

            if (unknownProperties.length > 0) {
                throw new AppError(`Unknown properties: ${unknownProperties.join(', ')}`, 400);
            }

            req.body = validatedBody;
            return next();

        } catch (error) {
            if (error instanceof ZodError) {
                throw new AppError("Invalid request body.", 400);
            }
        }
    }

    public carIdExists = async (req: Request, res: Response, next: NextFunction) => {

        const { id } = req.params;
        const foundCar = await prisma.car.findFirst({ where: { id } })

        if (!id) {
            throw new AppError("Car ID is required", 400);
        }


        if (!foundCar) {
            throw new AppError("Car not found.", 404);
        }

        res.locals = { ...res.locals, foundCar }
        return next()

    }
}

export const ensure = new EnsureMiddleware();