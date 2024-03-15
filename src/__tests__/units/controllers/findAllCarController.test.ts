import "reflect-metadata";

import { container } from "tsyringe";
import { Request, Response } from "express";
import { CarController } from "../../../controllers/Car.controller";
import { prisma } from "../../../database/prisma";
import { carControllerMock } from "../../__mocks__/units/controllers/carController.mock";

describe("Unit test: Find All the Cars controller", () => {
    const { body, expectedValue } = carControllerMock;

    const controller = container.resolve(CarController);
    const controllerFindAll = controller.findAll
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

    test("Should be able to Find All the cars.", async () => {
        const createdCar = await usertb.create({ data: body });

        await controllerFindAll(req as Request, res as Response);

        const { id, ...updatedExpectedValue } = expectedValue;

        const expectedValueId = [{

            ...updatedExpectedValue,
            id: createdCar.id,

        }]

        expect(res.json).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith(expectedValueId);

        expect(res.status).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});
