import { Document } from 'mongoose';

export interface MongooseConnect {
    useNewUrlParser: boolean;
    useUnifiedTopology: boolean;
    dbName: string;
  }

export interface ProductInterface extends Document {
  _id:string
  title: string;
  description: string;
}

export interface CategoryInterface extends Document {
  name: string;
}
