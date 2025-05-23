import "reflect-metadata";
import type { Express } from "express";

let testApp: Express | null = null;

export const getTestApp = async (): Promise<Express> => {
  if (!testApp) {
    try {
      // Import the server module dynamically to ensure mocks are applied
      const { initializeApp } = await import("@/server");
      testApp = await initializeApp();

      if (!testApp) {
        throw new Error("Failed to initialize test app - app is null");
      }

      console.log("Test app initialized successfully");
      return testApp;
    } catch (error) {
      console.error("Failed to initialize test app:", error);
      throw error;
    }
  }
  return testApp;
};

export const closeTestApp = async (): Promise<void> => {
  if (testApp) {
    console.log("Closing test app");
    testApp = null;
  }
};

export const initTestApp = async (): Promise<Express> => {
  try {
    const app = await getTestApp();
    console.log("Test app ready for user router tests");
    return app;
  } catch (error) {
    console.error("Failed to setup test app:", error);
    throw error;
  }
};
