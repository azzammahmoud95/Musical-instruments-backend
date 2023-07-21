import express from "express";
import {
  createCategory,
  deleteCategory,
  editCategory,
  getAllCategories,
  getCategoryById,
} from "../controller/category-controller";

const router = express.Router();

router.get("/",getAllCategories);

router.get('/:id',getCategoryById)

router.post("/", createCategory);

router.put('/:id',editCategory);

router.delete('/:id',deleteCategory);

export default router;
