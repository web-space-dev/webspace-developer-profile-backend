/*
 * File: item.controller.ts
 * Project: student-onshow-backend
 * Version: 1.0.0
 * File Created: Wednesday, 22nd April 2020 6:24:54 pm
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: Controller for the Item Model
 * Last Modified: Thursday, 23rd April 2020 5:13:57 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */

/**
 * Primary dependencies
 */
import { Request, Response } from "express";
import mongoose, { Schema } from "mongoose";

/**
 * Model Schema
 */
import Item from "../models/item.model";

/**
 * Helpers for sucess and error responses
 */
import { handleSuccess, handleError } from "../helpers/responseHandler";

/**
 * Create a item in the database
 *
 * @param req
 * @param res
 */
export const create = async (req: Request, res: Response) => {
  /**
   * Create a new Item from the Item Model
   */

  try {
    const item = new Item(req.body);

    await item.save();

    return res.status(200).json(handleSuccess(item));
  } catch (err) {
    return res.status(400).json(handleError(err));
  }
};

/**
 * Retreive all items from the database
 *
 * @param req
 * @param res
 */
export const list = async (req: Request, res: Response) => {
  try {
    const items = await Item.find({});

    return res.status(200).json(handleSuccess(items));
  } catch (err) {
    return res.status(400).json(handleError(err));
  }
};

/**
 * Retreive a item by ID from the database
 *
 * @param req
 * @param res
 */
export const show = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id).select("title created");

    return res.status(200).json(handleSuccess(item));
  } catch (err) {
    return res.status(400).json(handleError(err));
  }
};

/**
 * Update a item by ID
 *
 * @param req
 * @param res
 */
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await Item.findByIdAndUpdate(id, req.body);

    return res.status(200).json(handleSuccess(item));
  } catch (err) {
    return res.status(400).json(handleError(err));
  }
};

/**
 * Vote for an item by ID
 *
 * @param req
 * @param res
 */
export const vote = async (req: Request, res: Response) => {
  try {
    const { id, unvote } = req.params;

    const value = unvote === "true" ? -1 : 1;

    const item = await Item.findByIdAndUpdate(
      id,
      { $inc: { votes: value } },
      { new: true }
    );

    return res.status(200).json(handleSuccess({ item, unvote }));
  } catch (err) {
    return res.status(400).json(handleError(err));
  }
};

/**
 * Delete a item by ID
 *
 * @param req
 * @param res
 */
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    /**
     * Remove the item object
     */
    const item = await Item.deleteOne({ _id: id });

    return res.status(200).json(handleSuccess({ item }));
  } catch (err) {
    return res.status(400).json(handleError(err));
  }
};

/**
 * Type check for a Item
 */
type IItem = {
  _id?: mongoose.Types.ObjectId;
  author: string;
  link: string;
};

/**
 * Get the item by it's ID within an async Promise
 *
 * @param {Request} req
 */
export const itemByID = (req: Request) => {
  return new Promise<IItem>(async (resolve, reject) => {
    try {
      const { id } = req.params;
      const item: IItem = await Item.findById(id);

      resolve(item);
    } catch (err) {
      reject(err);
      return;
    }
  });
};
