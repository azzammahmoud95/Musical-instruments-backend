"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.editCategory = exports.createCategory = exports.getCategoryById = exports.getAllCategories = void 0;
const mongoose_1 = require("mongoose");
const category_model_1 = __importDefault(require("../model/category-model"));
const getAllCategories = async (req, res) => {
    try {
        const categories = await category_model_1.default.find();
        res.status(201).json(categories);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.getAllCategories = getAllCategories;
const getCategoryById = async (req, res) => {
    try {
        const categoryId = new mongoose_1.Types.ObjectId(req.params.id);
        const category = await category_model_1.default.findById(categoryId);
        res.status(200).json(category);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.getCategoryById = getCategoryById;
const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = new category_model_1.default({ name });
        const savedCategory = await category.save();
        res.status(201).json(savedCategory);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.createCategory = createCategory;
const editCategory = async (req, res) => {
    try {
        const categoryId = new mongoose_1.Types.ObjectId(req.params.id);
        const existingCategory = await category_model_1.default.findById(categoryId);
        if (!existingCategory)
            return res.status(404).json({ message: "Category Not Found" });
        let update = {
            name: req.body.name,
        };
        const updatedItem = await category_model_1.default.findByIdAndUpdate(req.params.id, { $set: update }, { new: true });
        res.status(200).json(updatedItem);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.editCategory = editCategory;
const deleteCategory = async (req, res) => {
    try {
        const categoryId = new mongoose_1.Types.ObjectId(req.params.id);
        if (!categoryId)
            return res.status(404).json({ message: "Category not found" });
        const deletedCategory = await category_model_1.default.findByIdAndDelete(categoryId);
        res.status(200).json({ message: "Category Deleted Sucessfully" });
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.deleteCategory = deleteCategory;
