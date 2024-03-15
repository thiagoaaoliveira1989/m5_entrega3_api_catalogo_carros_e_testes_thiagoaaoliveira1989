import { ZodError, z } from "zod";
import { AppError } from "../../../../error/AppError";

const validSchemaMock = z.object({
  name: z.string(),
  description: z.string(),
  brand: z.string(),
  year: z.number().positive(),
  km: z.number().positive(),
});

const validBodyMock = {
  bodyData: {
    name: "Gol",
    description: "Geração 5",
    brand: "WV",
    year: 2015,
    km: 150000,
  },
  expectedValue: {
    name: "Gol",
    description: "Geração 5",
    brand: "WV",
    year: 2015,
    km: 150000,
  },
};
const invalidBodyMock = {
  bodyData: {},
  expectedValue: AppError,
};

export { validBodyMock, validSchemaMock, invalidBodyMock };
