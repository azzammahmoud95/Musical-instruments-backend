"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUser = exports.deleteUser = exports.login = exports.register = exports.getUserById = exports.getAllUsers = void 0;
const user_model_1 = __importDefault(require("../model/user-model"));
const mongoose_1 = require("mongoose");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getAllUsers = async (req, res) => {
    try {
        const users = await user_model_1.default.find();
        res.status(201).json(users);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res) => {
    try {
        const userId = new mongoose_1.Types.ObjectId(req.params.id);
        const user = await user_model_1.default.findById(userId);
        if (!user)
            return res.status(404).json({ message: "User Not Found" });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.getUserById = getUserById;
const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({ message: "Please fill all informations" });
        }
        const existingEmail = await user_model_1.default.findOne({ email });
        if (existingEmail) {
            return res.status(404).json({ message: "email already Exists" });
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashPassword = bcryptjs_1.default.hashSync(password, salt);
        const newUser = new user_model_1.default({
            email,
            password: hashPassword,
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if email and password are provided in the request body
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }
        // Find the user by their email in the database
        const user = await user_model_1.default.findOne({ email }).select("+password");
        // Check if the user exists in the database
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcryptjs_1.default.compare(password, user.password);
        if (passwordMatch) {
            // Password is correct, generate a JWT token
            const token = generateToken(user._id);
            // Set the JWT token as a cookie (optional, can be stored in other ways)
            res.cookie("token", token, { httpOnly: true, maxAge: 900000 });
            // Return the user details and token in the response
            res.json({
                _id: user._id,
                email: user.email,
                token: token,
            });
        }
        else {
            // Password doesn't match, return an error response
            res.status(400).json({ message: "Invalid Credentials" });
        }
    }
    catch (error) {
        // Handle any internal server errors
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.login = login;
// ------------------> GENERATE TOKEN
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};
;
const deleteUser = async (req, res) => {
    try {
        const categoryId = new mongoose_1.Types.ObjectId(req.params.id);
        if (!categoryId)
            return res.status(404).json({ message: "Category not found" });
        const deletedUser = await user_model_1.default.findByIdAndDelete(categoryId);
        res.status(200).json({ message: "User Deleted Sucessfully" });
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.deleteUser = deleteUser;
const editUser = async (req, res) => {
    try {
        let update = {
            email: req.body.email,
        };
        const user = await user_model_1.default.findById(req.params.id);
        // check if the admin does not exist
        if (!user) {
            return res.status(404).json({ status: 404, message: "Not Found" });
        }
        const updatedUser = await user_model_1.default.findByIdAndUpdate(req.params.id, { $set: update }, {
            new: true,
        });
        res.status(200).json({ message: "Edit Updated Successfully", changes: updatedUser });
    }
    catch (error) {
        res.json(error);
    }
};
exports.editUser = editUser;
