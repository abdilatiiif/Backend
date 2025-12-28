import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  throw new Error(
    "MONGODB_URI inside the .env.development.local or .env.production.local file is missing"
  );
}

const conncectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);

    console.log(`Connected to MongoDB in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

export default conncectToDatabase;
