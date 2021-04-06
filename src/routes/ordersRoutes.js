import { Router } from 'express';
import ordersController from '../controllers/OrdersController';

const router = Router();
router.get('/',
  ordersController.getOrders);
router.get('/:id',
  ordersController.getOrder);

export default router;
