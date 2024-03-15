import supertest from "supertest";
import { prisma } from "../../../database";
import { carMock } from '../../__mocks__/integrations/car/car.mock';
import { app } from "../../../app";
import { request } from "../../util";
describe("Integration Tests: Delete a Car router.", () => {
    const baseUrl = "/cars";
    const userTb = prisma.car;

    beforeAll(async () => {
        await userTb.deleteMany();
    })

    afterAll(async () => {
        await userTb.deleteMany();
    })


    test("Should to be able delete a car.", async () => {
        const existingCar = await userTb.create({ data: carMock });
        const res = await supertest(app)
            .delete(`${baseUrl}/${existingCar.id}`);

        expect(res.status).toBe(200);

    });

   
    test("Should not be able delete a car. - invalid id", async () => {
        const existingCar = await userTb.create({ data: carMock });
        const id = "23456"
        const res = await supertest(app)
            .delete(`${baseUrl}/${id}`);

        const expectedValue = { message: "Car not found." };

        expect(res.status).toBe(404);

        expect(res.body).toStrictEqual(expectedValue);
    });
})