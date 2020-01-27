import express from 'express';
import 'express-async-errors';
import {
  getAllProducts,
  getProductById,
  createProduct,
} from '../Controllers';

const productRoutes = express.Router();

productRoutes
  .route('/')
  .get(getAllProducts)
  .post(createProduct);

productRoutes.route('/:id').get(getProductById);

export default productRoutes;
