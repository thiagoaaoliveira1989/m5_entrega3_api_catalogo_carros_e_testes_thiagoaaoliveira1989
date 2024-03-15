import "reflect-metadata";

import { container } from "tsyringe";
import { prisma } from "../../../database";
import { CarService } from "../../../services/Car.services";
import { carServiceMock } from "../../__mocks__/units/services/carService.mock";

describe("Unit test: Create car service", () => {
    const carService = container.resolve(CarService);
    const service = carService.create
    const usertb = prisma.car;

    beforeEach(async () => {
        await usertb.deleteMany();
    });

    afterAll(async () => {
        await usertb.deleteMany();
    });


    test("Should be able to create a car.", async () => {
        const { body: payload, expectedValue } = carServiceMock;

        const recieved = await service(payload);
        expect(recieved).toStrictEqual(expectedValue);
    });

})