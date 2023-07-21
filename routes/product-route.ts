import express from 'express' 
import { createProduct } from "../controller/product-controller";
const router = express.Router()

router.post('/',createProduct);

export default router;