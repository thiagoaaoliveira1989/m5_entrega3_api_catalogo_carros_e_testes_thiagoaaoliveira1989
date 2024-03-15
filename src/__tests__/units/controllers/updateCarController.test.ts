import "reflect-metadata";

import { container } from "tsyringe";
import { Request, Response } from "express";
import { CarController } from "../../../controllers/Car.controller";
import { prisma } from "../../../database/prisma";
import { carControllerMock } from "../../__mocks__/units/controllers/carController.mock";

describe("Unit test: Update Car controller", () => {
    const { body, updateBody, expectedValue } = carControllerMock;

    const controller = container.resolve(CarController);
    const controllerUpdate = controller.update
    const usertb = prisma.car;

    let req: Partial<Request> = {};
    let res: Partial<Response> = {};

    beforeEach(async () => {
        await usertb.deleteMany();

        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
    });

    afterAll(async () => {
        await usertb.deleteMany();
    });

    test("Should be able to update a car.", async () => {
        const createdCar = await usertb.create({ data: body });

        req.params = { id: createdCar.id };
        req.body = updateBody;

        await controllerUpdate(req as Request, res as Response);

        expect(res.json).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith(expectedValue);

        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});
