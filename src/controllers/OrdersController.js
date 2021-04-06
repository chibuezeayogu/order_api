import orderSevice from '../services/OrderService';
import { resourceSuccess, } from '../helpers/responseHandler';

class OrderController {

  constructor(orderSevice) {
    this.orderSevice = orderSevice;
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
  getOrders = async(req, res, next) => {
    const [error, orders] = await this.orderSevice.getAllOrders();
    if (error) return next(error);

    return resourceSuccess(res, orders);
  }
}

export default new OrderController(orderSevice);
