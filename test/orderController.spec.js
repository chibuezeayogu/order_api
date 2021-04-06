import supertest from 'supertest';
import { beforeEach, afterEach, describe, it } from 'mocha';
import { expect } from 'chai';
import app from '../src/server';
import db from '../src/config/db';
import ordersCollection from './mockData/orderCollection';

const request = supertest(app);

describe('OrdersController', () => {
  beforeEach(() => {
    ordersCollection.map(doc => {
      const uid = Object.keys(doc)[0]
      const data = Object.values(doc)[0]
      db.collection('orders').doc(uid).set({ ...data });
    })
  })
  afterEach(() => {
    ordersCollection.map(doc => {
      const uid = Object.keys(doc)[0]
      db.collection('orders').doc(uid).delete();
    })
  })
  describe('GET Orders: /api/vi/orders', () => {
    it('should return all orders', async () => {
      const { body } = await request
        .get('/api/v1/orders')
        .expect(200);
      
      expect(body.success).to.eql(true)
      expect(body.data.length).to.eql(2)
      expect(body.data[0].title).to.eql('Order title 1')
      expect(body.data[0].uid).to.eql("hKlIKPoZc2xCKGTUKZK01")
    })
  })
  describe('GET Order: /api/vi/orders/:id', () => {
    it('should return an error message if an invalid Id is passed', async () => {
      const { body } = await request
        .get(`/api/v1/orders/wrong_id`)
        .expect(404);
      
      expect(body.success).to.eql(false)
      expect(body.message).to.eql('Order with Id=wrong_id not found')
    })
  })
  describe('GET Order: /api/vi/orders/:id', () => {
    it('should return an order matching the param id', async () => {
      const { body } = await request
        .get(`/api/v1/orders/hKlIKPoZc2xCKGTUKZK01`)
        .expect(200);
      
      expect(body.success).to.eql(true)
      expect(body.data.title).to.eql('Order title 1')
      expect(body.data.uid).to.eql("hKlIKPoZc2xCKGTUKZK01")
    })
  })
})
