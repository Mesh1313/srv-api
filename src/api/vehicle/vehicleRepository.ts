import { AppDataSource } from "@/db/data-source";
import { VehicleEntity } from "@/entities/Vehicle";
import type { Repository } from "typeorm";

export const getVehicleRepository = (): Repository<VehicleEntity> => {
  if (!AppDataSource.isInitialized) {
    throw new Error("DataSource is not initialized. Make sure to call initializeDatabase() first.");
  }
  return AppDataSource.getRepository(VehicleEntity);
};

export const VehicleRepositoryMethods = {
  async findByMakeAndModel(make: string, model: string): Promise<VehicleEntity[]> {
    const repo = getVehicleRepository();
    return repo
      .createQueryBuilder("vehicle")
      .where("vehicle.make = :make", { make })
      .andWhere("vehicle.model = :model", { model })
      .getMany();
  },

  async findByVin(vin: string): Promise<VehicleEntity | null> {
    const repo = getVehicleRepository();
    return repo.findOneBy({ vin });
  },
};

// For backward compatibility (if you still need the extended pattern)
export const VehicleRepository = {
  ...VehicleRepositoryMethods,
  // Add base repository methods as needed
  find: (options?: any) => getVehicleRepository().find(options),
  findOne: (options?: any) => getVehicleRepository().findOne(options),
  findOneBy: (options?: any) => getVehicleRepository().findOneBy(options),
  save: (entity: any) => getVehicleRepository().save(entity),
  remove: (entity: any) => getVehicleRepository().remove(entity),
};
