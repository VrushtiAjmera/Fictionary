require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const pino = require("pino");
const pinoHttp = require("pino-http");
const { z } = require("zod");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/auth.routes");
const logger = pino();

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  CLIENT_URL: z.string().url(),
  MONGODB_URI: z.string().min(1),
  JWT_SECRET: z.string().min(32),
});

const env = envSchema.parse(process.env);
const app = express();

app.use(helmet());
app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(pinoHttp({ logger }));
app.use("/api/auth", authRoutes);


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});

app.use((err, req, res, next) => {
  logger.error({ err }, "Request failed");

  if (res.headersSent) return next(err);

  res.status(err.status || 500).json({
    success: false,
    message:
      env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message || "Internal server error",
  });
});

async function startServer() {
  try {
    await connectDB();

    app.listen(env.PORT, () => {
      logger.info(`Fictionary API running at http://localhost:${env.PORT}`);
    });
  } catch (error) {
    logger.error({ err: error }, "Failed to start Fictionary API");
    process.exit(1);
  }
}

startServer();

