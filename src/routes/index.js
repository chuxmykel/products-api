import express from 'express';
import productRoutes from './products';

const router = express();

router.get('/', (req, res) =>
  res.status(200).json({
    status: res.statusCode,
    message: 'Products API',
  }),
);

router.use('/products', productRoutes);

export default router;
