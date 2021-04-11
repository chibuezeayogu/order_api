import createError from 'http-errors'
import { StatusCodes } from 'http-status-codes'
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

const { INTERNAL_SERVER_ERROR } = StatusCodes;

class OrderController {

  constructor(ordersSevice) {
    this.ordersSevice = ordersSevice;
  }

  /**
   * Return next error if unsucessfull, 
   * else return a json response with orders and 200 status code
   * 
   * @param {Request} req 
   * @param {Response} res 
   * @param {NextFunction} next 
   * 
   * @returns Response orders/error
   */
  getOrders = async (req, res, next) => {
    const [error, orders] = await this.ordersSevice.getAll();
    if (error) return next(createError(INTERNAL_SERVER_ERROR, error));

    return resourceSuccess(res, orders);
  }

  /**
   * Return error if request is unsuccessful
   * else return a json response with order and 200 status
   * 
  * @param {Request} req 
   * @param {Response} res 
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
    if (error) return next(createError(INTERNAL_SERVER_ERROR, error));
    
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
    if (error) return next(createError(INTERNAL_SERVER_ERROR, error));
    
    return resourceSuccess(res, order, 'Updated successfuly');
  }

  /**
   * Creates order if all valid params are provided
   * else returns error
   * 
  * @param {Request} req 
   * @param {Response} res 
   * @param {NextFunction} next
   * 
   * @returns Response - created order
   */
  createOrder = async (req, res, next) => {
    const [error, order] = await this
      .ordersSevice
      .addOrder(formatCreateData(req.body))
    
      if (error) return next(createError(INTERNAL_SERVER_ERROR, error));

    return resourceCreated(res, order);
  }
}

export default new OrderController(ordersSevice);
