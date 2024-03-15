import "reflect-metadata";
import { container } from "tsyringe";
import { CarService } from "../../../services/Car.services";
import { prisma } from "../../../database";
import { carServiceMock } from "../../__mocks__/units/services/carService.mock";

describe("Unit test: FindA dor ID car service", () => {
    const carService = container.resolve(CarService);
    const service = carService.findId
    const usertb = prisma.car;

    beforeEach(async () => {
        await usertb.deleteMany();
    })

    afterAll(async () => {
        await usertb.deleteMany();
    })

    test("should be able to Find for ID the cars", async () => {
        const { body } = carServiceMock;
        const newCar = await usertb.create({ data: body });

        const allCars = await service(newCar.id);


        const updatedExpectedValue = {
            ...body,
            id: newCar.id,
        };


        expect(allCars).toStrictEqual(updatedExpectedValue);

    })
})