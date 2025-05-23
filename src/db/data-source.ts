import path from "node:path";
import { env } from "@/common/utils/envConfig";
import { logger } from "@/server";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: env.DB_SYNC, // Only true in development
  logging: env.isProduction ? ["error"] : ["query", "error"],
  entities: [path.join(__dirname, "../entities/**/*.{ts,js}")],
  migrations: [path.join(__dirname, "../migrations/**/*.{ts,js}")],
  subscribers: [],
});

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    logger.info(`Database connection established successfully${env.DB_HOST}`, env.DB_PORT, env.DB_USERNAME);
  } catch (error) {
    logger.error(`Database connection failed: ${(error as Error).message}`);
    throw error;
  }
};
