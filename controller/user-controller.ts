import { Request, Response } from "express";
import userModel from "../model/user-model";
import { UserInterface } from "../types";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users: UserInterface[] = await userModel.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = new Types.ObjectId(req.params.id);
    const user: UserInterface | null = await userModel.findById(userId);

    if (!user) return res.status(404).json({ message: "User Not Found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({ message: "Please fill all informations" });
    }
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res.status(404).json({ message: "email already Exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const newUser: UserInterface = new userModel({
      email,
      password: hashPassword,
    });
    const savedUser: UserInterface = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided in the request body
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    // Find the user by their email in the database
    const user = await userModel.findOne({ email }).select("+password");

    // Check if the user exists in the database
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

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
    } else {
      // Password doesn't match, return an error response
      res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    // Handle any internal server errors
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// ------------------> GENERATE TOKEN
const generateToken = (id:string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};;

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const categoryId = new Types.ObjectId(req.params.id);

    if (!categoryId)
      return res.status(404).json({ message: "Category not found" });

    const deletedUser : UserInterface | null  = await userModel.findByIdAndDelete(categoryId);

    res.status(200).json({ message: "User Deleted Sucessfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const editUser = async (req:Request, res:Response) => {
  try {

    let update = {
      email: req.body.email,
    };
    const user = await userModel.findById(req.params.id);

    // check if the admin does not exist
    if (!user) {
      return res.status(404).json({ status: 404, message: "Not Found" });
    }


    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      {
        new: true,
      }
    );

    res.status(200).json({ message: "Edit Updated Successfully", changes: updatedUser });
  } catch (error) {
    res.json(error);
  }
};