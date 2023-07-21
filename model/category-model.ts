import { Schema, model } from "mongoose";
import { CategoryInterface } from "../types";

const categorySchema = new Schema<CategoryInterface>(
  {
    name: { type: String },
  },
  { timestamps: true }
);

export default model<CategoryInterface>("Category", categorySchema);
