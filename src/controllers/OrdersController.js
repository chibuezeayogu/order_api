import ordersSevice from '../services/OrderService';
import { resourceSuccess, resourceNotFound } from '../helpers/responseHandler';
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
    const [error, orders] = await this.ordersSevice.getAll();
    if (error) return next(error);

    return resourceSuccess(res, orders);
  }

  /**
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
    if (error) return next(error);
    
    return resourceSuccess(res, order);
  }
}

export default new OrderController(ordersSevice);
