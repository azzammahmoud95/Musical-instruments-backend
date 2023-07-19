import express from 'express';
import connectionDB from './config/db';
import cors from 'cors';
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import ProductRoute from './routes/product-route';

const app = express()
app.use(cors());
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
connectionDB();

app.get("/", (req, res) => {
  res.send("The server is healthy");
});
app.use('/api/product',ProductRoute)

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
