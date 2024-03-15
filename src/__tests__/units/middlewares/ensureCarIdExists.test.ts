import { NextFunction, Request, Response } from "express";
import { ensure } from "../../../middlewares/ensure.middleware";
import { prisma } from "../../../database/prisma";
import { AppError } from "../../../error/AppError";

describe("Unit test: Ensure carIdExists middleware", () => {
  const carIdExistsMiddleware = ensure.carIdExists;

  let req: Partial<Request> = {};
  let res: Partial<Response> = {};
  let next: NextFunction = jest.fn();

  beforeEach(() => {
    next = jest.fn();
  });

  test("Should be able to validate a req.params exists.", async () => {
    const bodyData = {
      name: "Gol",
      description: "Geração 5",
      brand: "WV",
      year: 2015,
      km: 150000,
    };

    const newCar = await prisma.car.create({ data: bodyData });

    req.params = { id: newCar.id };

    await carIdExistsMiddleware(req as Request, res as Response, next);

    expect(req.params).toStrictEqual({ id: newCar.id });

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });
});
