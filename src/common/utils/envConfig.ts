import dotenv from "dotenv";
import { bool, cleanEnv, host, num, port, str, testOnly } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ devDefault: testOnly("test"), choices: ["development", "production", "test"] }),
  HOST: host({ devDefault: testOnly("localhost") }),
  PORT: port({ devDefault: testOnly(3000) }),
  CORS_ORIGIN: str({ devDefault: testOnly("http://localhost:3000") }),
  COMMON_RATE_LIMIT_MAX_REQUESTS: num({ devDefault: testOnly(1000) }),
  COMMON_RATE_LIMIT_WINDOW_MS: num({ devDefault: testOnly(1000) }),
  DB_HOST: host({ devDefault: "postgres" }),
  DB_PORT: port({ devDefault: 5432 }),
  DB_USERNAME: str({ devDefault: "" }),
  DB_PASSWORD: str({ devDefault: "" }),
  DB_NAME: str({ devDefault: "" }),
  DB_SYNC: bool({ devDefault: testOnly(true) }),
});
