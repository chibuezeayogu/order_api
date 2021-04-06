import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import orderRoutes from './ordersRoutes';

const { OK } = StatusCodes;
const router = Router();

router.use('/orders', orderRoutes);
router.get('/', (req, res) => {
  res
    .status(OK)
    .json({
      success: true,
      message: "Welcome to Order API"
    });
})

export default router;
