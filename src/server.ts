import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";

import { openAPIRouter } from "@/api-docs/openAPIRouter";
import { exampleRouter } from "@/api/example/exampleRouter";
import { userRouter } from "@/api/user/userRouter";
import errorHandler from "@/common/middleware/errorHandler";
import rateLimiter from "@/common/middleware/rateLimiter";
import requestLogger from "@/common/middleware/requestLogger";
import { env } from "@/common/utils/envConfig";
import { initializeDatabase } from "@/db/data-source";
import { vehicleRouter } from "./api/vehicle/vehicleRouter";

const logger = pino({ name: "server start" });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(requestLogger);

// Root path handler
app.get("/", (req, res) => {
  res.json({
    message: "Vehicle Mechanic Shop Management API is running",
    documentation: "/swagger",
    endpoints: ["/example", "/users", "/vehicles"],
  });
});

// Swagger UI
// app.use("/swagger", openAPIRouter);

// Routes
// app.use("/example", exampleRouter);
// app.use("/users", userRouter);
// app.use("/vehicles", vehicleRouter);

// Error handlers
// app.use(errorHandler());

// Initialize database and setup routes
const initializeApp = async () => {
  try {
    // Initialize database first
    await initializeDatabase();

    // Now import and setup routes (after DB is initialized)
    const { openAPIRouter } = await import("@/api-docs/openAPIRouter");
    const { exampleRouter } = await import("@/api/example/exampleRouter");
    const { userRouter } = await import("@/api/user/userRouter");
    const { vehicleRouter } = await import("@/api/vehicle/vehicleRouter");

    // Swagger UI
    app.use("/swagger", openAPIRouter);

    // Routes
    app.use("/example", exampleRouter);
    app.use("/users", userRouter);
    app.use("/vehicles", vehicleRouter);

    // Error handlers
    app.use(errorHandler());

    return app;
  } catch (error) {
    logger.error(`Failed to initialize app: ${(error as Error).message}`);
    throw error;
  }
};

export { app, logger, initializeApp };
