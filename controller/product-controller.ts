import { Request, Response } from "express";
import categoryModel from "../model/category-model";
import productModel from "../model/product-model";
import { ProductInterface, CategoryInterface } from "../types";
import { Types } from "mongoose";

// ---------------> GET ALL PRODUCTS
export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const products: ProductInterface[] = await productModel.find();
    res.status(201).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = new Types.ObjectId(req.params.id);

    if (!productId)  return res.status(404).json({ message: "productId Not found" });

    const product: ProductInterface | null = await productModel.findById(
      productId
    );
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const categoryId: CategoryInterface | null = await categoryModel.findById(
      req.body.categoryId
    );

    if (!categoryId)
      return res.status(404).json({ message: "CategoryId Not found" });

    const product: ProductInterface = new productModel({
      title: req.body.title,
      description: req.body.description,
      categoryId: req.body.categoryId,
    });

    const savedProduct: ProductInterface = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const editProduct = async (req: Request, res: Response) => {
  try {
    const productId = new Types.ObjectId(req.params.id);
    const existingProduct: ProductInterface | null =
      await productModel.findById(productId);

    if (!existingProduct)
      return res.status(404).json({ message: "Product Not Found" });

    let update: Partial<ProductInterface> = {
      title: req.body.title,
      description: req.body.description,
      categoryId: req.body.categoryId,
    };

    let updatedProduct: ProductInterface | null =
      await productModel.findByIdAndUpdate(
        req.params.id,
        { $set: update },
        { new: true }
      );
      res.status(202).json(updatedProduct);

  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteProduct = async (req:Request,res:Response) => {

 try{
  const productId = new Types.ObjectId(req.params.id);

   if (!productId) return res.status(404).json({ message: "Product Not Found" });

   const deletedProduct:ProductInterface | null = await productModel.findByIdAndDelete(productId)
   res.status(200).json({message:"Product Deleted Successfully"})
  }
   catch(error){
    res.status(500).json(error)
   }
}
