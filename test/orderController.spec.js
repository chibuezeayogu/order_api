import supertest from 'supertest';
import { before, describe, it } from 'mocha';
import { expect } from 'chai';
import app from '../src/server';
import db from '../src/config/db';
import ordersCollection from './mockData/orderCollection';

const request = supertest(app);

describe('OrdersController', () => {
  before(() => {
    ordersCollection.map(doc => {
      const uid = Object.keys(doc)[0]
      const data = Object.values(doc)[0]
      db.collection('orders').doc(uid).set({ ...data });
    })
  })
  describe('GET Orders: /api/vi/orders', () => {
    it('should return all orders', async () => {
      const { body } = await request
        .get('/api/v1/orders')
        .expect(200);
      
      expect(body.success).to.eql(true)
      expect(body.data.length).to.eql(2)
      expect(body.data[0].title).to.eql('Order titile')
      expect(body.data[0].uid).to.eql("hKlIKPoZc2xCKGTUKZK2")
    })
  })
})
