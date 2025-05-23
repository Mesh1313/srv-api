import "reflect-metadata";
import { env } from "@/common/utils/envConfig";
import { initializeApp, logger } from "@/server";

const startServer = async () => {
  try {
    // Initialize the database connection
    const app = await initializeApp();

    const server = app.listen(env.PORT, () => {
      const { NODE_ENV, HOST, PORT } = env;
      logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
    });

    const onCloseSignal = () => {
      logger.info("sigint received, shutting down");
      server.close(() => {
        logger.info("server closed");
        process.exit();
      });
      setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
    };

    process.on("SIGINT", onCloseSignal);
    process.on("SIGTERM", onCloseSignal);
  } catch (error) {
    logger.error(`Failed to start server: ${(error as Error).message}`);
    process.exit(1);
  }
};

startServer();
