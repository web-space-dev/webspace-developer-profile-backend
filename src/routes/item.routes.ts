/*
 * File: item.routes.ts
 * Project: student-onshow-backend
 * Version: 1.0.0
 * File Created: Wednesday, 22nd April 2020 6:42:27 pm
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: Routes for the Item collection
 * Last Modified: Thursday, 23rd April 2020 5:14:48 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */

import express from "express";
import * as itemCtrl from "../controllers/item.controller";

const router = express.Router();
const prefix = "/api/item";

/**
 * @method POST - Create a new item
 * @method GET - List all items
 */
router.route(`${prefix}`).post(itemCtrl.create).get(itemCtrl.list);

/**
 * @method GET - Item By ID
 * @method PUT - Update a item by ID
 * @method DELETE - Delete a item by ID
 */
router
  .route(`${prefix}/:id`)
  .get(itemCtrl.show)
  .put(itemCtrl.update)
  .delete(itemCtrl.remove);

/**
 * @method GET - Vote for an Item By ID
 */
router.route(`${prefix}/vote/:id/:unvote`).put(itemCtrl.vote);

export default router;
