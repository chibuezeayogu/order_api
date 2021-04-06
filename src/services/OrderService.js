import db from '../config/db';

class OrderService {

  constructor(db) {
    this.orderRef = db.collection('orders');
  }

  /**
   * Get all orders from firestore
   * return error if unsuccessful
   * else return orders
   * 
   * @returns {any} orders/error
   */
  getAllOrders = async () => {
    try {
      const orderRef = await this.orderRef.get();
      const orders = orderRef.docs.map(doc => doc.data());
      return [null, orders];
    } catch (error) {
      return [error, null];
    }
  }
}

export default new OrderService(db);
