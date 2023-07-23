import express from 'express' 
import { createProduct,deleteProduct,editProduct,getAllProduct,getProductById } from "../controller/product-controller";
const router = express.Router()

router.get('/',getAllProduct);

router.get('/:id',getProductById)

router.post('/',createProduct);

router.put('/:id',editProduct);

router.delete('/:id',deleteProduct);

export default router;