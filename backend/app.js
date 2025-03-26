import express from "express";
import { config } from "dotenv";

import authRoutes from "./routes/auth.route.js";

import errorHandler from "./utils/errorHandler.js";

config();

const app = express();

app.use(express.json({ limit: "16kb" }));

app.use("/api/v1/auth", authRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
