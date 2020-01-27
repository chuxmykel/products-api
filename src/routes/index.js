import express from 'express';

const router = express();

router.get('/', (req, res) =>
  res.status(200).json({
    status: res.statusCode,
    message: 'Products API',
  }),
);

export default router;
