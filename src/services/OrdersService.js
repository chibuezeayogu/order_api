import { async } from 'regenerator-runtime';
import db from '../config/db';
class OrderService {

  /**
   * OrderService constructor initializes db
   * 
   * @param {FirebaseFirestore} db 
   */
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
  getAll = async () => {
    try {
      const orderRef = await this.orderRef.get();
      const orders = orderRef.docs.map(doc => doc.data());
      return [null, orders];
    } catch (error) {
      return [error, null];
    }
  }

  /**
   * Get one order given order Id
   * return error if unsuccessful
   * else return order
   * 
   * @param {string} orderId
   * 
   * @returns Response
   */
  getOne = async (orderId) => {
    try {
      const doc = await this.orderRef          
        .doc(orderId)
        .get();
      
      if (!doc.exists) return [null, orderId, null];
  
      return [null, null, doc.data()];
    } catch (error) {
      return [error, null, null];
    }
  }

  /**
   * Update order record
   * 
   * @param {object} body 
   * @param {string} id 
   * 
   * @returns Response
   */
  updateOrderInfo = async (body, orderId) => {
    try {
      const { title, bookingDate } = body;
      const doc = await this.orderRef
        .doc(orderId)
        .get();
        
      if (!doc.exists) return [null, orderId, null];
      await this.orderRef
        .doc(orderId)
        .update({ title, bookingDate });

      return [null, null, { ...doc.data(), ...body }];
    } catch (error) {
      return [error, null, null];
    }
  }
}

export default new OrderService(db);
