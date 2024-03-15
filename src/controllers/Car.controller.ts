import { container } from "tsyringe"
import { CarService } from "../services/Car.services"
import { Request, Response } from "express";

export class CarController {

    private service = container.resolve(CarService);

    public create = async (req: Request, res: Response): Promise<Response> => {
        return res.status(201).json(await this.service.create(req.body));
    }

    public findAll = async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).json(await this.service.findAll());
    }

    public findId = async (req: Request, res: Response): Promise<Response> => {
        const { foundCar } = res.locals;
        return res.status(200).json(await this.service.findId(foundCar.id));
    }

    public update = async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).json(await this.service.update(req.params.id, req.body));
    }

    public delete = async (req: Request, res: Response): Promise<Response> => {
        await this.service.delete(req.params.id);
        return res.status(200).json();
    }
}