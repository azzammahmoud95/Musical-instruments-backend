"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.editProduct = exports.createProduct = exports.getProductById = exports.getAllProduct = void 0;
const category_model_1 = __importDefault(require("../model/category-model"));
const product_model_1 = __importDefault(require("../model/product-model"));
const mongoose_1 = require("mongoose");
// ---------------> GET ALL PRODUCTS
const getAllProduct = async (req, res) => {
    try {
        const products = await product_model_1.default.find();
        res.status(201).json(products);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.getAllProduct = getAllProduct;
const getProductById = async (req, res) => {
    try {
        const productId = new mongoose_1.Types.ObjectId(req.params.id);
        if (!productId)
            return res.status(404).json({ message: "productId Not found" });
        const product = await product_model_1.default.findById(productId);
        res.status(201).json(product);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.getProductById = getProductById;
const createProduct = async (req, res) => {
    try {
        const categoryId = await category_model_1.default.findById(req.body.categoryId);
        if (!categoryId)
            return res.status(404).json({ message: "CategoryId Not found" });
        const product = new product_model_1.default({
            title: req.body.title,
            description: req.body.description,
            categoryId: req.body.categoryId,
        });
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.createProduct = createProduct;
const editProduct = async (req, res) => {
    try {
        const productId = new mongoose_1.Types.ObjectId(req.params.id);
        const existingProduct = await product_model_1.default.findById(productId);
        if (!existingProduct)
            return res.status(404).json({ message: "Product Not Found" });
        let update = {
            title: req.body.title,
            description: req.body.description,
            categoryId: req.body.categoryId,
        };
        let updatedProduct = await product_model_1.default.findByIdAndUpdate(req.params.id, { $set: update }, { new: true });
        res.status(202).json(updatedProduct);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.editProduct = editProduct;
const deleteProduct = async (req, res) => {
    try {
        const productId = new mongoose_1.Types.ObjectId(req.params.id);
        if (!productId)
            return res.status(404).json({ message: "Product Not Found" });
        const deletedProduct = await product_model_1.default.findByIdAndDelete(productId);
        res.status(200).json({ message: "Product Deleted Successfully" });
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.deleteProduct = deleteProduct;
