/*
 * File: express.tsx
 * Project: student-onshow-backend
 * Version: 1.0.0
 * File Created: Monday, 20th April 2020 10:02:08 pm
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: Initilises and runs the express server
 * Last Modified: Thursday, 23rd April 2020 5:26:54 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */

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
import itemRoutes from "./routes/item.routes";

/**
 * Config environment variables
 */

import config from "../config/config";

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

app.use("/", itemRoutes);

export default app;
