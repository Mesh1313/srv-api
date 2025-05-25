import { handleServiceResponse } from "@/common/utils/httpHandlers";
import type { Request, RequestHandler, Response } from "express";
import { vehicleService } from "./vehicleService";

class VehicleController {
  getVehicles: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await vehicleService.findAll();
    return handleServiceResponse(serviceResponse, res);
  };

  getVehicle: RequestHandler = async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id as string);
    const serviceResponse = await vehicleService.findById(id);
    return handleServiceResponse(serviceResponse, res);
  };

  createVehicle: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await vehicleService.create(req.body);
    return handleServiceResponse(serviceResponse, res);
  };

  updateVehicle: RequestHandler = async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id as string);
    const serviceResponse = await vehicleService.update(id, req.body);
    return handleServiceResponse(serviceResponse, res);
  };

  deleteVehicle: RequestHandler = async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id as string);
    const serviceResponse = await vehicleService.delete(id);
    return handleServiceResponse(serviceResponse, res);
  };
}

export const vehicleController = new VehicleController();
