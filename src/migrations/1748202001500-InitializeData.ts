import { Customer } from "@/entities/Customer";
import { Vehicle } from "@/entities/Vehicle";
import type { MigrationInterface, QueryRunner } from "typeorm";

export class InitializeData1748202001500 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const customerRepository = queryRunner.manager.getRepository(Customer);
    const vehicleRepository = queryRunner.manager.getRepository(Vehicle);

    // Create customers
    const customer1 = customerRepository.create({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phoneNumber: "555-123-4567",
      address: "123 Main Street",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      loyaltyPoints: 0,
      receivePromotions: true,
      preferredContactMethod: "email",
    });

    const customer2 = customerRepository.create({
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      phoneNumber: "555-987-6543",
      address: "456 Oak Avenue",
      city: "Springfield",
      state: "NY",
      zipCode: "67890",
      loyaltyPoints: 150,
      receivePromotions: false,
      preferredContactMethod: "phone",
    });

    const savedCustomer1 = await customerRepository.save(customer1);
    const savedCustomer2 = await customerRepository.save(customer2);

    // Create vehicles
    const vehicle1 = vehicleRepository.create({
      make: "Toyota",
      model: "Camry",
      year: 2020,
      vin: "JT2BG22K123456789",
      licensePlate: "ABC-1234",
      color: "Silver",
      engineType: "2.5L 4-Cylinder",
      transmission: "Automatic",
      mileage: 25000,
      owner: savedCustomer1,
    });

    const vehicle2 = vehicleRepository.create({
      make: "Honda",
      model: "Civic",
      year: 2019,
      vin: "JHMFC1F30KX012345",
      licensePlate: "XYZ-9876",
      color: "Blue",
      engineType: "1.5L Turbo",
      transmission: "CVT",
      mileage: 35000,
      owner: savedCustomer2,
    });

    await vehicleRepository.save([vehicle1, vehicle2]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const vehicleRepository = queryRunner.manager.getRepository(Vehicle);
    const customerRepository = queryRunner.manager.getRepository(Customer);

    // Remove vehicles first (due to foreign key constraint)
    await vehicleRepository.delete({ vin: "JT2BG22K123456789" });
    await vehicleRepository.delete({ vin: "JHMFC1F30KX012345" });

    // Remove customers
    await customerRepository.delete({ email: "john.doe@example.com" });
    await customerRepository.delete({ email: "jane.smith@example.com" });
  }
}
