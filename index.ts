import express from 'express';
import connectionDB from './config/db';
import cors from 'cors';
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import productRoute from './routes/product-route';
import categoryRoute from './routes/category-route';
import userRoute from './routes/user-route';

const app = express()

//---------> Enable CORS
app.use(cors());
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//---------->Connection to DATEBASE
connectionDB();

app.get("/", (req, res) => {
  res.send("The server is healthy");
});

// --------> API Routes 
app.use('/api/product',productRoute);
app.use('/api/user',userRoute)
app.use('/api/category',categoryRoute);
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
