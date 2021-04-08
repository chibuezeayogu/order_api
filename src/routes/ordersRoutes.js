import { Router } from 'express';
import ordersController from '../controllers/OrdersController';
import {
  updateInputValidator,
  inputValidationResult,
  postInputValidator,
  authorizeUser
} from '../middleware/validation';


const router = Router();
router.get('/',
  authorizeUser,
  ordersController.getOrders);
router.post('/',
  authorizeUser,
  postInputValidator,
  inputValidationResult,
  ordersController.createOrder);
router.get('/:id',
  authorizeUser,
  ordersController.getOrder);
router.put('/:id',
  authorizeUser,
  updateInputValidator,
  inputValidationResult,
  ordersController.updateOrder);

export default router;
