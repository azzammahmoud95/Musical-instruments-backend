import { Schema, model } from "mongoose";
import { ProductInterface } from "../types";
import categoryModel from "./category-model";

const productSchema = new Schema<ProductInterface>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "category",
    },
  },
  { timestamps: true }
);

productSchema.pre(["find"], function () {
  this.populate({ path: "categoryId", model: categoryModel });
});

productSchema.pre(["findOne"], function () {
  this.populate({ path: "categoryId", model: categoryModel });
});

productSchema.pre(["save"], function () {
  this.populate({ path: "categoryId", model: categoryModel });
});
export default model<ProductInterface>("Products", productSchema);
