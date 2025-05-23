import type { Request } from "express";
import { type RateLimitRequestHandler, rateLimit } from "express-rate-limit";

import { env } from "@/common/utils/envConfig";

const dummyLimiter = ((req, res, next) => next()) as RateLimitRequestHandler;

const rateLimiter =
  env.NODE_ENV === "production"
    ? rateLimit({
        legacyHeaders: true,
        limit: env.COMMON_RATE_LIMIT_MAX_REQUESTS,
        message: "Too many requests, please try again later.",
        standardHeaders: true,
        windowMs: 15 * 60 * env.COMMON_RATE_LIMIT_WINDOW_MS,
        keyGenerator: (req: Request) => req.ip as string,
      })
    : dummyLimiter;

export default rateLimiter;
