import ordersSevice from '../services/OrdersService';
import {
  formatCreateData,
  formatUpdateData
} from '../utils/formatData';
import {
  resourceSuccess,
  resourceNotFound,
  resourceCreated
} from '../helpers/responseHandler';
import { applicationError } from '../middleware/errorHandlers';

class OrderController {

  constructor(ordersSevice) {
    this.ordersSevice = ordersSevice;
  }

  /**
   * Return next error if unsucessfull, 
   * else return a json response with orders and 200 status code
   * 
   * @param {Request} req 
   * @param {Respinse} res 
   * @param {NextFunction} next 
   * 
   * @returns Response orders/error
   */
  getOrders = async (req, res, next) => {
    console.log(req.headers.authorization)
    const [error, orders] = await this.ordersSevice.getAll();
    if (error) return next(applicationError(error, res, next));

    return resourceSuccess(res, orders);
  }

  /**
   * Return error if request is unsuccessful
   * else return a json response with order and 200 status
   * 
  * @param {Request} req 
   * @param {Respinse} res 
   * @param {NextFunction} next
   *  
   * @returns Response order
   */
  getOrder = async (req, res, next) => {
    const { id } = req.params;
    const [error, orderId, order] = await this
      .ordersSevice.
      getOne(id);

    if (orderId) return resourceNotFound(res, orderId);
    if (error) return next(applicationError(error, res, next));
    
    return resourceSuccess(res, order);
  }

  /**
   * Return error if unsuccessful
   * return a json response of update order and 200 status code
   * 
   * @param {Request} req 
   * @param {Response} res 
   * @param {NextFunction} next
   * 
   * @returns Response
   */
  updateOrder = async (req, res, next) => {
    const { id } = req.params;
    const [error, orderId, order] = await this
      .ordersSevice.
      updateOrderInfo(formatUpdateData(req.body), id);

    if (orderId) return resourceNotFound(res, orderId);
    if (error) return next(applicationError(error, res, next));
    
    return resourceSuccess(res, order, 'Updated successfuly');
  }

  createOrder = async (req, res, next) => {
    const [error, order] = await this
      .ordersSevice
      .addOrder(formatCreateData(req.body))
    
      if (error) return next(applicationError(error, res, next));

    return resourceCreated(res, order);
  }
}

export default new OrderController(ordersSevice);
