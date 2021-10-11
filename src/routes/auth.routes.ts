import express from "express";
import * as authCtrl from "../controllers/auth.controller";

const router = express.Router();
const prefix = "/api/auth";

/**
 * @method POST - Signs in a user
 */
router.route(`${prefix}/signin`).post(authCtrl.signin);

export default router;
