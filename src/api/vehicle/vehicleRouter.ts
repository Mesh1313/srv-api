import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { validateRequest } from "@/common/utils/httpHandlers";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express from "express";
import { z } from "zod";
import { vehicleController } from "./vehicleController";
import {
  CreateVehicleSchema,
  DeleteVehicleSchema,
  GetVehicleSchema,
  UpdateVehicleSchema,
  VehicleSchema,
} from "./vehicleModel";

export const vehicleRegistry = new OpenAPIRegistry();
export const vehicleRouter = express.Router();

vehicleRegistry.register("Vehicle", VehicleSchema);

vehicleRegistry.registerPath({
  method: "get",
  path: "/vehicles",
  tags: ["Vehicle"],
  responses: createApiResponse(z.array(VehicleSchema), "Success"),
});
vehicleRouter.get("/", vehicleController.getVehicles);

vehicleRegistry.registerPath({
  method: "get",
  path: "/vehicles/{id}",
  tags: ["Vehicle"],
  request: { params: GetVehicleSchema.shape.params },
  responses: createApiResponse(z.array(VehicleSchema), "Success"),
});
vehicleRouter.get("/:id", validateRequest(GetVehicleSchema), vehicleController.getVehicle);

vehicleRegistry.registerPath({
  method: "post",
  path: "/vehicles",
  tags: ["Vehicle"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateVehicleSchema.shape.body,
        },
      },
    },
  },
  responses: createApiResponse(z.array(VehicleSchema), "Success"),
});
vehicleRouter.post("/", validateRequest(CreateVehicleSchema), vehicleController.createVehicle);

vehicleRegistry.registerPath({
  method: "put",
  path: "/vehicles/{id}",
  tags: ["Vehicle"],
  request: {
    params: UpdateVehicleSchema.shape.params,
    body: {
      content: {
        "application/json": {
          schema: UpdateVehicleSchema.shape.body,
        },
      },
    },
  },
  responses: createApiResponse(z.array(VehicleSchema), "Success"),
});
vehicleRouter.put("/:id", validateRequest(UpdateVehicleSchema), vehicleController.updateVehicle);

vehicleRegistry.registerPath({
  method: "delete",
  path: "/vehicles/{id}",
  tags: ["Vehicle"],
  request: { params: DeleteVehicleSchema.shape.params },
  responses: createApiResponse(z.array(VehicleSchema), "Success"),
});
vehicleRouter.delete("/:id", validateRequest(DeleteVehicleSchema), vehicleController.deleteVehicle);
