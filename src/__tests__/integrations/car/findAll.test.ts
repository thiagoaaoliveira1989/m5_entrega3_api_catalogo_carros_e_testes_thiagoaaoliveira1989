import { prisma } from "../../../database";
import { carMock } from "../../__mocks__/integrations/car/car.mock";
import { request } from "../../util";

describe("Integration Tests: FindAll Cars router.", () => {
    const baseUrl = "/cars";
    const userTb = prisma.car;

    beforeAll(async () => {
        await userTb.deleteMany();
    })

    afterAll(async () => {
        await userTb.deleteMany();
    })

    test("Should be able to find a car.", async () => {
        const existingCar = await userTb.create({ data: carMock });
        const res = await request.get(baseUrl);


        expect(res.status).toBe(200);

        expect(res.body).toStrictEqual([{
            id: existingCar.id,
            name: carMock.name,
            description: carMock.description,
            brand: carMock.brand,
            year: carMock.year,
            km: carMock.km
        }]);
    });


})