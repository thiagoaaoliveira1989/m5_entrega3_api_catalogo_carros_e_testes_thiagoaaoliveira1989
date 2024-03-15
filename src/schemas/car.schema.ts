import { z } from "zod";

export const carSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    brand: z.string(),
    year: z.number(),
    km: z.number()
})

export const createCarSchema = carSchema.omit({ id: true })
    ;
export const updateCarSchema = createCarSchema.partial();

export const returnCarSchema = carSchema;