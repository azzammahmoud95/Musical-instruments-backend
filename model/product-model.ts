import { Schema,Document, model } from "mongoose";
import { ProductInterface } from "../types";
const productSchema = new Schema<ProductInterface>({
    title: { type: String },
    description: { type: String },
  });
export default model<ProductInterface>("Product", productSchema);