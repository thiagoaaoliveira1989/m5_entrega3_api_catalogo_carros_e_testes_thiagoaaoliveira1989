import supertest from "supertest";
import { prisma } from "../../../database";
import { carMock } from '../../__mocks__/integrations/car/car.mock';
import { app } from "../../../app";
import { request } from "../../util";
describe("Integration Tests: FindId Cars router.", () => {
    const baseUrl = "/cars";
    const userTb = prisma.car;

    beforeAll(async () => {
        await userTb.deleteMany();
    })

    afterAll(async () => {
        await userTb.deleteMany();
    })

    test("Should be able to find a car by ID.", async () => {
        const existingCar = await userTb.create({ data: carMock });

        const res = await supertest(app)
            .get(`${baseUrl}/${existingCar.id}`)
            .send();

        expect(res.status).toBe(200);

        expect(res.body).toStrictEqual({
            id: existingCar.id,
            name: existingCar.name,
            description: existingCar.description,
            brand: existingCar.brand,
            year: existingCar.year,
            km: existingCar.km
        });
    });

    test("Should not be able to find a car by ID. - invalid id", async () => {
        const existingCar = await userTb.create({ data: carMock });
        const id = "23456"
        const res = await supertest(app)
            .get(`${baseUrl}/${id}`)
            .send();
        
        const expectedValue = { message: "Car not found." };

        expect(res.status).toBe(404);
        
        expect(res.body).toStrictEqual(expectedValue);
    });
})