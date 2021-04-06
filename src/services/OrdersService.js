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
  updateOrderInfo = async (values, orderId) => {
    try {
      const doc = await this.orderRef
        .doc(orderId)
        .get();
        
      if (!doc.exists) return [null, orderId, null];
      await this.orderRef
        .doc(orderId)
        .update(values);

      return [null, null, { ...doc.data(), ...values}];
    } catch (error) {
      return [error, null, null];
    }
  }

  /**
   * Create order with provided values
   * return order if successful
   * else return error
   * 
   * @param {object} values 
   * 
   * @returns Response
   */
  addOrder = async (values) => {
    try {
      await this
        .orderRef
        .doc(values.uid)
        .set(values);

      return [null, values]
    } catch (error) {
      return [error, null];
    }
  }
}

export default new OrderService(db);
