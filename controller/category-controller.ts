import { Request, Response } from "express";
import { Types } from "mongoose";
import categoryModel from "../model/category-model";
import { CategoryInterface } from "../types";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories: CategoryInterface[] = await categoryModel.find();
    res.status(201).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const categoryId = new Types.ObjectId(req.params.id);
    const category = await categoryModel.findById(categoryId);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const category: CategoryInterface = new categoryModel({ name });
    const savedCategory: CategoryInterface = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const editCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = new Types.ObjectId(req.params.id);
    const existingCategory: CategoryInterface | null =
      await categoryModel.findById(categoryId);

    if (!existingCategory)
      return res.status(404).json({ message: "Category Not Found" });

    let update: Partial<CategoryInterface> = {
      name: req.body.name,
    };

    const updatedItem: CategoryInterface | null =
      await categoryModel.findByIdAndUpdate(
        req.params.id,
        { $set: update },
        { new: true }
      );
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = new Types.ObjectId(req.params.id);
    if (!categoryId)
      return res.status(404).json({ message: "Category not found" });

    const deletedCategory:CategoryInterface | null  = await categoryModel.findByIdAndDelete(categoryId);

    res.status(200).json({ message: "Category Deleted Sucessfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};
