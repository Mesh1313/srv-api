import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Request, type Response, type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

export const exampleRegistry = new OpenAPIRegistry();
export const exampleRouter: Router = express.Router();

exampleRegistry.registerPath({
  method: "get",
  path: "/example",
  tags: ["Example Status"],
  responses: createApiResponse(z.null(), "Success"),
});

exampleRouter.get("/", (_req: Request, res: Response) => {
  const serviceResponse = ServiceResponse.success("Example response OK", null);
  return handleServiceResponse(serviceResponse, res);
});
