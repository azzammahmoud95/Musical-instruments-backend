import { Schema, model } from "mongoose";
import { CategoryInterface } from "../types";

const categorySchema = new Schema<CategoryInterface>(
  {
    name: { type: String,required:true  },
  },
  { timestamps: true }
);

export default model<CategoryInterface>("Category", categorySchema);
