import { ServiceResponse } from "@/common/models/serviceResponse";
import { AppDataSource } from "@/db/data-source";
import { CustomerEntity } from "@/entities/Customer";
import { VehicleEntity } from "@/entities/Vehicle";
import { logger } from "@/server";
import { StatusCodes } from "http-status-codes";
import type { Vehicle } from "./vehicleModel";
import { VehicleRepository } from "./vehicleRepository";

export class VehicleService {
  async create(vehicleData: Partial<Vehicle>): Promise<ServiceResponse<VehicleEntity | null>> {
    try {
      const { ownerId, ...vehicleDetails } = vehicleData;

      const customerRepository = AppDataSource.getRepository(CustomerEntity);
      const ownerEntity = await customerRepository.findOneBy({ id: ownerId });

      if (!ownerEntity) {
        return ServiceResponse.failure(`Owner with ID ${ownerId} not found`, null, StatusCodes.NOT_FOUND);
      }

      const vehiclrEntity = await VehicleRepository.findByVin(vehicleDetails.vin || "");

      if (vehiclrEntity?.id) {
        return ServiceResponse.failure(
          `Vehicle with VIN ${vehicleDetails.vin} already exists`,
          null,
          StatusCodes.CONFLICT,
        );
      }

      const vehicle = new VehicleEntity();
      Object.assign(vehicle, vehicleData);
      vehicle.owner = ownerEntity;

      const savedVehicle = await VehicleRepository.save(vehicle);

      return ServiceResponse.success<VehicleEntity>("Vehicle created succesfully", savedVehicle, StatusCodes.CREATED);
    } catch (error) {
      logger.error(`Error [vehicleService.create]: ${(error as Error).message}`);
      return ServiceResponse.failure(
        "An error occurred while creating the vehicle",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<ServiceResponse<VehicleEntity[] | null>> {
    try {
      const vehicleEntities = await VehicleRepository.find({
        relations: {
          owner: true,
        },
      });

      return ServiceResponse.success<VehicleEntity[]>("Vehicles found succesfully", vehicleEntities);
    } catch (error) {
      logger.error(`Error [vehicleService.findAll]: ${(error as Error).message}`);
      return ServiceResponse.failure(
        "An error occurred while finding all vehicles",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: number): Promise<ServiceResponse<VehicleEntity | null>> {
    try {
      const vehicleEntity = await VehicleRepository.findOne({ where: { id }, relations: { owner: true } });

      if (!vehicleEntity) {
        return ServiceResponse.failure(`Vehicle with ID ${id} not found`, null, StatusCodes.NOT_FOUND);
      }

      return ServiceResponse.success<VehicleEntity>("Vehicle found succesfully", vehicleEntity);
    } catch (error) {
      logger.error(`Error [vehicleService.findById]: ${(error as Error).message}`);
      return ServiceResponse.failure(
        "An error occurred while finding vehicle by id",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, vehicleData: Partial<Vehicle>): Promise<ServiceResponse<VehicleEntity | null>> {
    try {
      const { ownerId } = vehicleData;
      const customerRepository = AppDataSource.getRepository(CustomerEntity);
      const ownerEntity = await customerRepository.findOneBy({ id: ownerId });

      if (!ownerEntity) {
        return ServiceResponse.failure(`Owner with ID ${ownerId} not found`, null, StatusCodes.NOT_FOUND);
      }

      const existingVehicle = await VehicleRepository.findOneBy({ id });

      if (!existingVehicle) {
        return ServiceResponse.failure(`Vehicle with ID ${id} doesn't exist`, null, StatusCodes.NOT_FOUND);
      }

      Object.assign(existingVehicle, vehicleData);
      existingVehicle.owner = ownerEntity;

      const updatedVehicle = await VehicleRepository.save(existingVehicle);

      return ServiceResponse.success<VehicleEntity>("Vehicle updated succesfully", updatedVehicle);
    } catch (error) {
      logger.error(`Error [vehicleService.update]: ${(error as Error).message}`);
      return ServiceResponse.failure(
        "An error occurred while updating vehicle",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: number): Promise<ServiceResponse<null>> {
    try {
      const vehicleEntity = await VehicleRepository.findOneBy({ id });

      if (!vehicleEntity) {
        return ServiceResponse.failure(`Vehicle with ID ${id} not found`, null, StatusCodes.NOT_FOUND);
      }

      await VehicleRepository.remove({ id });

      return ServiceResponse.success("Vehicle deleted succesfully", null);
    } catch (error) {
      logger.error(`Error [vehicleService.delete]: ${(error as Error).message}`);
      return ServiceResponse.failure(
        "An error occurred while finding vehicle by id",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export const vehicleService = new VehicleService();
