import { injectable } from "tsyringe"
import { prisma } from "../database"
import { ICar, ICreateCar, IUpdateCar } from "../interfaces/car.interface"
import { returnCarSchema } from "../schemas/car.schema"


@injectable()
export class CarService {
    public create = async (payload: ICreateCar): Promise<ICar> => {
        const newCar = await prisma.car.create({ data: payload })
        return returnCarSchema.parse(newCar);
    }

    public findAll = async (): Promise<ICar[]> => {
        const allCars = await prisma.car.findMany();
        return returnCarSchema.array().parse(allCars);
    }

    public findId = async (id: string): Promise<ICar> => {
        const CarForId = await prisma.car.findFirst({ where: { id } });
        return returnCarSchema.parse(CarForId);
    }

    public update = async (id: string, payload: IUpdateCar): Promise<ICar> => {
        const updateCar = await prisma.car.update({
            where: { id },
            data: {
                name: payload?.name as string,
                description: payload?.description as string,
                brand: payload?.brand as string,
                year: payload?.year as number,
                km: payload?.km as number,
            }
        })

        return returnCarSchema.parse(updateCar);

    }

    public delete = async (id: string): Promise<void> => {
        await prisma.car.delete({ where: { id } });
    }
}