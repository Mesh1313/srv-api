import { AppDataSource } from "@/db/data-source";
import { Vehicle } from "@/entities/Vehicle";

export const VehicleRepository = AppDataSource.getRepository(Vehicle).extend({
  async findByMakeAndModel(make: string, model: string): Promise<Vehicle[]> {
    return this.createQueryBuilder("vehicle")
      .where("vehicle.make = :make", { make })
      .andWhere("vehicle.model = :model", { model })
      .getMany();
  },

  async findByVin(vin: string): Promise<Vehicle | null> {
    return this.findOneBy({ vin });
  },
});
