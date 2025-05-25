import path from "node:path";
import { config } from "dotenv";
import { DataSource } from "typeorm";

// Load environment variables from .env.migration if it exists, otherwise from .env
const envFile = process.env.NODE_ENV === "migration" ? ".env.migration" : ".env";
config({ path: envFile });

export default new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number.parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "",
  entities: [path.join(__dirname, "src/entities/**/*.{ts,js}")],
  migrations: [path.join(__dirname, "src/migrations/**/*.{ts,js}")],
  subscribers: [path.join(__dirname, "src/subscribers/**/*.{ts,js}")],
  synchronize: false, // Always false when using migrations
  logging: ["query", "error", "schema", "warn", "info", "log"],
  migrationsRun: false,
  migrationsTableName: "migrations_history",
});
