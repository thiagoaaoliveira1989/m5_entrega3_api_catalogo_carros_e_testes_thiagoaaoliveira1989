import "reflect-metadata";
import { container } from "tsyringe";
import { CarService } from "../../../services/Car.services";
import { prisma } from "../../../database";
import { carServiceMock } from "../../__mocks__/units/services/carService.mock";

describe("Unit test: FindAll car service", () => {
    const carService = container.resolve(CarService);
    const service = carService.findAll
    const usertb = prisma.car;

    beforeEach(async () => {
        await usertb.deleteMany();
    })

    afterAll(async () => {
        await usertb.deleteMany();
    })

    test("should be able to FindAll the cars", async () => {
        const { body, expectedValue } = carServiceMock;
        const newCar = await usertb.create({ data: body });

        const allCars = await service();


        const updatedExpectedValue = [{
            ...expectedValue,
            id: newCar.id,
        }];


        expect(allCars).toStrictEqual(updatedExpectedValue);

    })
})