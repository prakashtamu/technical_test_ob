// src/utils/database.ts

// TODO: Set up the database connection.

// Hints:
// - Use Mongoose to connect to your MongoDB instance.
// - Create a function to initialize the connection.
// - Use environment variables or a configuration file for the connection URI.

// Example (from a different context):

import Env from "@/utils/env";
import Logger from "@/utils/logger";
import mongoose from "mongoose";

export const initializeDatabase = async () => {
  try {
    // Mongoose connection options can be specified here
    await mongoose.connect(Env.DATABASE_URL, {});
    Logger.info("Database connected");
  } catch (error) {
    Logger.error(`Error connecting to database: ${error}`);
    process.exit(1);
  }
};

export const closeDatabase = async () => {
  try {
    await mongoose.connection.close();
    Logger.info("Database connection closed");
  } catch (error) {
    Logger.error(`Error closing database connection: ${error}`);
  }
};
