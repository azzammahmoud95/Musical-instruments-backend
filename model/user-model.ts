import { Schema, model } from "mongoose";
import { UserInterface } from "../types";

const userSchema = new Schema<UserInterface>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<UserInterface>("User", userSchema);
