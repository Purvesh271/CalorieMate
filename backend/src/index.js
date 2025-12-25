import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/users.routes.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);


const startServer = async () => {
  try {
    await mongoose.connect(process.env.ATLASDB_URL);
    console.log("Connected to database");

    app.listen(8080, () => {
      console.log("Server running on http://localhost:8080");
    });
  } catch (error) {
    console.error("DB connection failed:", error.message);
  }
};

startServer();