/**
 * Import primary dependencies
 */
import express, { Application, Request, Response } from "express";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";

/**
 * Import Routes
 */

import authRoutes from "./routes/auth.routes";

const CURRENT_WORKING_DIR = process.cwd();
const app: Application = express();

/**
 * parse body params and attache them to req.body
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());

/**
 * Secure apps by setting various HTTP headers
 */
app.use(helmet());

/**
 * enable CORS - Cross Origin Resource Sharing
 */
app.use(cors());

app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

app.use("/", authRoutes);

export default app;
