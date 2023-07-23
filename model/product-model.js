"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const category_model_1 = __importDefault(require("./category-model"));
const productSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "category",
    },
}, { timestamps: true });
productSchema.pre(["find"], function () {
    this.populate({ path: "categoryId", model: category_model_1.default });
});
productSchema.pre(["findOne"], function () {
    this.populate({ path: "categoryId", model: category_model_1.default });
});
productSchema.pre(["save"], function () {
    this.populate({ path: "categoryId", model: category_model_1.default });
});
exports.default = (0, mongoose_1.model)("Products", productSchema);
