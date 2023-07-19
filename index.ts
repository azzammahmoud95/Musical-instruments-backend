import express from 'express';
// import connectionDB from './config/db';
import cors from 'cors';
import dotenv from "dotenv";
const app = express()
app.use(cors());
dotenv.config();

app.get("/", (req, res) => {
  res.send("The server is healthy");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
