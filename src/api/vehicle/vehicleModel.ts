import { z } from "zod";

export type Vehicle = z.infer<typeof VehicleSchema>;
export const VehicleSchema = z.object({
  make: z.string(),
  model: z.string(),
  year: z.number(),
  vin: z.string(),
  licensePlate: z.string(),
  color: z.string(),
  engineType: z.string(),
  transmission: z.string(),
  mileage: z.number().int(),
  ownerId: z.number().int(),
});

export const CreateVehicleSchema = z.object({
  body: z.object({
    make: z.string().min(1, "Make is required"),
    model: z.string().min(1, "Model is required"),
    year: z.number().int().min(1900, "Year must be after 1900"),
    vin: z.string().min(1, "VIN is required"),
    licensePlate: z.string().optional(),
    color: z.string().optional(),
    engineType: z.string().optional(),
    transmission: z.string().optional(),
    mileage: z.number().int().optional(),
    ownerId: z.number().int().positive("Owner ID must be positive"),
  }),
});

export const UpdateVehicleSchema = z.object({
  params: z.object({
    id: z
      .string()
      .refine((data) => !Number.isNaN(Number(data)), "ID must be a numeric value")
      .transform(Number)
      .refine((num) => num > 0, "ID must be a positive number"),
  }),
  body: z
    .object({
      make: z.string().min(1, "Make is required").optional(),
      model: z.string().min(1, "Model is required").optional(),
      year: z.number().int().min(1900, "Year must be after 1900").optional(),
      vin: z.string().min(1, "VIN is required").optional(),
      licensePlate: z.string().optional(),
      color: z.string().optional(),
      engineType: z.string().optional(),
      transmission: z.string().optional(),
      mileage: z.number().int().optional(),
      ownerId: z.number().int().positive("Owner ID must be positive").optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided for update",
    }),
});

export const GetVehicleSchema = z.object({
  params: z.object({
    id: z
      .string()
      .refine((data) => !Number.isNaN(Number(data)), "ID must be a numeric value")
      .transform(Number)
      .refine((num) => num > 0, "ID must be a positive number"),
  }),
});

export const DeleteVehicleSchema = z.object({
  params: z.object({
    id: z
      .string()
      .refine((data) => !Number.isNaN(Number(data)), "ID must be a numeric value")
      .transform(Number)
      .refine((num) => num > 0, "ID must be a positive number"),
  }),
});
