import { Request, Response } from "express";
import productModel from "../model/product-model";
import { ProductInterface } from "../types";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const product: ProductInterface = new productModel({ title, description });
    const savedProduct: ProductInterface = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
};
