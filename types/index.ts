import { Document,Types } from "mongoose";

export interface MongooseConnect {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
  dbName: string;
}

export interface CategoryInterface extends Document {
  name: string;
}
export interface ProductInterface extends Document {
  title: string;
  description: string;
  categoryId: Types.ObjectId;
}
export interface UserInterface extends Document{
  email: string;
  password:string;
}
