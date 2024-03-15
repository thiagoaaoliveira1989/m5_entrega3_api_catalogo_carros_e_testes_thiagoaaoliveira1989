import { Request, Response } from "express";

import { prisma } from "../../../database";
import { carInvalidMock, carMock, carUpdatedMock } from "../../__mocks__/integrations/car/car.mock";
import { request } from "../../util";
import supertest from "supertest";
import { app } from "../../../app";

describe("Integration Tests: Update Car router.", () => {
    const baseUrl = "/cars";
    const userTb = prisma.car;

    let req: Partial<Request> = {};
    let res: Partial<Response> = {};

    beforeAll(async () => {
        await userTb.deleteMany();
    })

    afterAll(async () => {
        await userTb.deleteMany();
    })

    test("Should be able to update a car.", async () => {
        const existingCar = await userTb.create({ data: carMock });
        const res = await supertest(app)
            .patch(`${baseUrl}/${existingCar.id}`)
            .send(carUpdatedMock);


        const expectedValue = {
            id: expect.any(String),
            name: carUpdatedMock.name,
            description: carUpdatedMock.description,
            brand: carUpdatedMock.brand,
            year: carUpdatedMock.year,
            km: carUpdatedMock.km
        }

        expect(res.body).toStrictEqual(expectedValue);
        expect(res.status).toBe(200);
    })

    test("Should not be able to updated a car - invalid body.", async () => {

        const existingCar = await userTb.create({ data: carMock });

        const res = await supertest(app)
            .patch(`${baseUrl}/${existingCar.id}`)
            .send(carInvalidMock);

        const expectedValue = {
            "message": "Invalid request body."
        }

        expect(res.body).toStrictEqual(expectedValue);
        expect(res.status).toBe(400);

    });

    test("Should not be able to updated a car - invalid ID.", async () => {

        const existingCar = await userTb.create({ data: carMock });
        const id = "1234";
        const res = await supertest(app)
            .patch(`${baseUrl}/${id}`)
            .send(carInvalidMock);

        const expectedValue = {
            "message": "Car not found."
        }

        expect(res.body).toStrictEqual(expectedValue);
        expect(res.status).toBe(404);

    });
})