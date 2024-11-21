// src/utils/database.ts

// TODO: Set up the database connection.

// Hints:
// - Use Mongoose to connect to your MongoDB instance.
// - Create a function to initialize the connection.
// - Use environment variables or a configuration file for the connection URI.

// Example (from a different context):

import Env from "@/utils/env";
import mongoose from "mongoose";

export const initializeDatabase = async () => {
  try {
    // Mongoose connection options can be specified here
    await mongoose.connect(Env.DATABASE_URL, {});
    console.log("Connected to the database");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};
