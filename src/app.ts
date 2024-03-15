import "reflect-metadata";
import "express-async-errors";
import express, { json } from 'express';
import helmet from 'helmet'
import cors from "cors";
import { handleErrors } from "./middlewares/handleErrors.middlewares";
import { carRouter } from "./routers/car.router";


export const app = express();
app.use(json());
app.use(helmet());
app.use(cors());

app.use("/cars", carRouter)

app.use(handleErrors)


