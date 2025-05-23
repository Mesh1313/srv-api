import type { Express } from "express";
import { StatusCodes } from "http-status-codes";
import request from "supertest";

import { closeTestApp, initTestApp } from "@/test/testApp";
import { generateOpenAPIDocument } from "../openAPIDocumentGenerator";

describe("OpenAPI Router", () => {
  let app: Express;

  beforeAll(async () => {
    app = await initTestApp();
  });

  afterAll(async () => {
    await closeTestApp();
  });

  describe("Swagger JSON route", () => {
    const baseRoute = "/swagger";

    it("should return Swagger JSON content", async () => {
      // Arrange
      const expectedResponse = generateOpenAPIDocument();

      // Act
      const response = await request(app!).get(`${baseRoute}/swagger.json`);

      // Assert
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.type).toBe("application/json");
      expect(response.body).toEqual(expectedResponse);
    });

    it("should serve the Swagger UI", async () => {
      // Act
      const response = await request(app!)
        .get(`${baseRoute}/`) // Add trailing slash
        .redirects(1); // Follow one redirect

      // Assert
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.text).toContain("swagger-ui");
    });
  });
});
