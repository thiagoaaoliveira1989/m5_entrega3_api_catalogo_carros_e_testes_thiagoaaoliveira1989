import { prisma } from "../../../database";
import { carInvalidMock, carMock } from "../../__mocks__/integrations/car/car.mock";
import { request } from "../../util";

describe("Integration Tests: Create Car router.", () => {
    const baseUrl = "/cars";
    const userTb = prisma.car;

    beforeAll(async () => {
        await userTb.deleteMany();
    })

    afterAll(async () => {
        await userTb.deleteMany();
    })

    test("Should be able to create a car.", async () => {
        const res = await request.post(baseUrl).send(carMock);

        const expectedValue = {
            id: expect.any(String),
            name: carMock.name,
            description: carMock.description,
            brand: carMock.brand,
            year: carMock.year,
            km: carMock.km
        }

        expect(res.body).toStrictEqual(expectedValue);
        expect(res.status).toBe(201);
    })

    test("Should not be able to create a user - invalid body.", async () => {
        const res = await request.post(baseUrl).send(carInvalidMock);

        const expectedValue = {
            "message": "Invalid request body."
        }

        expect(res.body).toStrictEqual(expectedValue);
        expect(res.status).toBe(400);

    });
})