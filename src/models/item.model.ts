/*
 * File: item.model.ts
 * Project: student-onshow-backend
 * Version: 1.0.0
 * File Created: Wednesday, 22nd April 2020 6:12:42 pm
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: Model which represents the Item Schema
 * Last Modified: Thursday, 23rd April 2020 5:14:25 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */

import mongoose, { Schema, Document } from "mongoose";

interface ItemInterface extends Document {
  author: string;
  link: string;
  username: string;
  votes: number;
  created: Date;
  updated: Date;
}
/**
 * Schema for an item
 */
const ItemSchema: Schema = new Schema({
  author: { type: String, required: true, unique: true },
  link: { type: String, required: true },
  votes: { type: Number, default: 0 },
  username: { type: String, required: true, unique: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date },
});

const Item = mongoose.model<ItemInterface>("Item", ItemSchema);
export default Item;
