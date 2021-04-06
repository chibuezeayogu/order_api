import { Router } from 'express';
import ordersController from '../controllers/OrdersController';
import {
  updateInputValidator,
  inputValidationResult
} from '../middleware/validation';


const router = Router();
router.get('/',
  ordersController.getOrders);
router.get('/:id',
  ordersController.getOrder);
router.put('/:id',
  updateInputValidator,
  inputValidationResult,
  ordersController.updateOrder);

export default router;
