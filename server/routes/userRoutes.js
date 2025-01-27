import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();


// api for products

router.get('/products/getproducts', userController.getProducts);
router.get('/products/:productType', userController.getproductstype);


// user Routes 

router.post('/signup',userController.createUser)
router.post('/login',userController.loginUser)



export default router; 