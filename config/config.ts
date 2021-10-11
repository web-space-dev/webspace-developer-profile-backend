import dotenv from "dotenv";
dotenv.config();

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI || "",
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  jwtSecret: process.env.JWT_SECRET,
  SESSION_TTL: process.env.SESSION_TTL,
  PLUTIO_CLIENT_ID: process.env.PLUTIO_CLIENT_ID,
  PLUTIO_CLIENT_SECRET: process.env.PLUTIO_CLIENT_SECRET,
  PLUTIO_BUSINESS_DOMAIN: process.env.PLUTIO_BUSINESS_DOMAIN,
};

export default config;
