import { z } from "zod";
import { carSchema, createCarSchema, updateCarSchema } from "../schemas/car.schema";

export type ICar = z.infer<typeof carSchema>

export type ICreateCar = z.infer<typeof createCarSchema>

export type IUpdateCar = z.infer<typeof updateCarSchema>

