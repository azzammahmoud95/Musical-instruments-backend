import { Document } from 'mongoose';

export interface MongooseConnect {
    useNewUrlParser: boolean;
    useUnifiedTopology: boolean;
    dbName: string;
  }

export interface ProductInterface extends Document {
  title: string;
  description: string;
}
