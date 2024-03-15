import "reflect-metadata";

import { container } from "tsyringe";
import { prisma } from "../../../database";
import { CarService } from "../../../services/Car.services";
import { carServiceMock } from "../../__mocks__/units/services/carService.mock";

describe("Unit test: Delete car service", () => {
    const carService = container.resolve(CarService);
    const service = carService.delete
    const usertb = prisma.car;

    beforeEach(async () => {
        await usertb.deleteMany();
    });

    afterAll(async () => {
        await usertb.deleteMany();
    });


    test("Should be able to delete a car.", async () => {
        const { body } = carServiceMock;
        const newCar = await usertb.create({ data: body });

        const received = await service(newCar.id);

        expect(received).toBeUndefined();
    });

})