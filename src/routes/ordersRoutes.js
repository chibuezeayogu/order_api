import { Router } from 'express';
import orderController from '../controllers/OrdersController';

const router = Router();
router.get('/',
  orderController.getOrders);

export default router;
