import { CustomerEntity } from "@/entities/Customer";
import { VehicleEntity } from "@/entities/Vehicle";
import { StatusCodes } from "http-status-codes";
import type { Vehicle } from "../vehicleModel";
import { VehicleRepository } from "../vehicleRepository";
import { VehicleService, vehicleService } from "../vehicleService";

// Create mock repository outside - this will be accessible
const mockCustomerRepository = {
  findOneBy: vi.fn(),
  find: vi.fn(),
  save: vi.fn(),
  remove: vi.fn(),
};

const mockCustomer: CustomerEntity = CustomerEntity.fromPlainObject({
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phoneNumber: "",
  address: "",
  city: "",
  state: "",
  zipCode: "A1B2C3",
  createdAt: new Date(),
  updatedAt: new Date(),
});

const mockVehicles = [
  {
    id: 1,
    vin: "1HGBH41JXMN109186",
    make: "Honda",
    model: "Civic",
    year: 2021,
    mileage: 25000,
    ownerId: 1,
    licensePlate: "",
    color: "",
    engineType: "",
    transmission: "",
    lastServiceDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    vin: "2HGBH41JXMN109187",
    make: "Toyota",
    model: "Camry",
    year: 2020,
    mileage: 35000,
    ownerId: 2,
    licensePlate: "",
    color: "",
    engineType: "",
    transmission: "",
    lastServiceDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
] as Vehicle[];

vi.mock("@/db/data-source", () => ({
  AppDataSource: {
    getRepository: vi.fn(() => ({
      findOneBy: vi.fn(() => mockCustomer),
      find: vi.fn(),
      save: vi.fn(),
      remove: vi.fn(),
    })),
  },
}));

vi.mock("@/api/vehicle/vehicleRepository", () => ({
  VehicleRepository: {
    find: vi.fn(),
    findOne: vi.fn(),
    findOneBy: vi.fn(),
    save: vi.fn(),
    remove: vi.fn(),
    findByMakeAndModel: vi.fn(),
    findByVin: vi.fn(),
  },
}));

describe("vehicleService", () => {
  let vehicleServiceInstance: VehicleService;

  beforeEach(() => {
    vi.clearAllMocks();
    // Create service instance without arguments (uses default constructor)
    vehicleServiceInstance = new VehicleService();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("findAll", () => {
    it("should return all vehicles", async () => {
      // Arrange
      (VehicleRepository.find as any).mockResolvedValue(mockVehicles.map((v) => VehicleEntity.fromPlainObject(v)));

      // Act
      const res = await vehicleService.findAll();

      // Assert
      expect(res.statusCode).toEqual(StatusCodes.OK);
      expect(res.success).toBeTruthy();
      expect(res.message).equals("Vehicles found succesfully");
      expect(res.responseObject).toEqual(mockVehicles);
    });

    it("returns an empty array for no vehicles found", async () => {
      // Arrange
      (VehicleRepository.find as any).mockResolvedValue([]);

      // Act
      const res = await vehicleService.findAll();

      // Assert
      expect(res.statusCode).toEqual(StatusCodes.OK);
      expect(res.success).toBeTruthy();
      expect(res.message).equals("Vehicles found succesfully");
      expect(res.responseObject).toEqual([]);
    });

    it("handles errors for findAllAsync", async () => {
      // Arrange
      (VehicleRepository.find as any).mockRejectedValue(new Error("Database error"));

      // Act
      const result = await vehicleService.findAll();

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(result.success).toBeFalsy();
      expect(result.message).equals("An error occurred while finding all vehicles");
      expect(result.responseObject).toBeNull();
    });
  });

  describe("findById", () => {
    it("should return a vehicle for a valid ID", async () => {
      const mockVehicle = mockVehicles[0];
      // Arrange
      (VehicleRepository.findOne as any).mockResolvedValue(VehicleEntity.fromPlainObject(mockVehicle));

      // Act
      const result = await vehicleService.findById(1);

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.OK);
      expect(result.success).toBeTruthy();
      expect(result.message).equals("Vehicle found succesfully");
      expect(result.responseObject).toEqual(mockVehicle);
    });

    it("should return not found for non-existent ID", async () => {
      // Arrange
      (VehicleRepository.findOneBy as any).mockResolvedValue(null);
      (VehicleRepository.findOne as any).mockResolvedValue(null);

      // Act
      const result = await vehicleService.findById(999);

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(result.success).toBeFalsy();
      expect(result.message).equals("Vehicle with ID 999 not found");
      expect(result.responseObject).toBeNull();
    });
  });

  describe("create", () => {
    const mockVehicleData = mockVehicles[0];

    it("should create vehicle", async () => {
      // Arrange
      mockCustomerRepository.findOneBy.mockResolvedValue(mockCustomer);
      (VehicleRepository.findByVin as any).mockResolvedValue(null); // VIN doesn't exist

      const savedVehicle = new VehicleEntity();
      Object.assign(savedVehicle, mockVehicleData);
      savedVehicle.id = 1;
      savedVehicle.owner = mockCustomer;
      savedVehicle.createdAt = new Date();
      savedVehicle.updatedAt = new Date();

      (VehicleRepository.save as any).mockResolvedValue(savedVehicle);

      // Act
      const result = await vehicleServiceInstance.create(mockVehicleData);

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.CREATED);
      expect(result.success).toBeTruthy();
      expect(result.message).equals("Vehicle created succesfully");
      expect(result.responseObject).toEqual(savedVehicle);
    });
  });
});
