import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";

import { exampleRegistry } from "@/api/example/exampleRouter";
import { userRegistry } from "@/api/user/userRouter";
import { vehicleRegistry } from "@/api/vehicle/vehicleRouter";

export function generateOpenAPIDocument() {
  const registry = new OpenAPIRegistry([exampleRegistry, userRegistry, vehicleRegistry]);
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Swagger API",
    },
    externalDocs: {
      description: "View the raw OpenAPI Specification in JSON format",
      url: "/swagger.json",
    },
  });
}
