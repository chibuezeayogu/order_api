import supertest from 'supertest';
import { beforeEach, afterEach, describe, it } from 'mocha';
import { expect } from 'chai';
import app from '../src/server';
import db from '../src/config/db';
import ordersCollection from './mockData/orderCollection';
import { completeData, missingTitle, token } from './mockData/orderCreate';

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
        .set({ authorization: token })
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
        .set({ Authorization: token })
        .expect(404);
      
      expect(body.success).to.eql(false)
      expect(body.message).to.eql('Order with Id=wrong_id not found')
    })
  })

  describe('GET Order: /api/vi/orders/:id', () => {
    it('should return an order matching the param id', async () => {
      const { body } = await request
        .get(`/api/v1/orders/hKlIKPoZc2xCKGTUKZK01`)
        .set({ Authorization: token })
        .expect(200);
      
      expect(body.success).to.eql(true)
      expect(body.data.title).to.eql('Order title 1')
      expect(body.data.uid).to.eql("hKlIKPoZc2xCKGTUKZK01")
    })
  })

  describe('PUT Order: /api/vi/orders/:id', () => {
    it('should return validation error if title or bookingDate is not provided', async () => {
      const { body } = await request
        .put(`/api/v1/orders/hKlIKPoZc2xCKGTUKZK01`)
        .set({ authorization: token })
        .send({ title: "Order title 1 Updated" })
        .expect(422);
      
      expect(body.success).to.eql(false)
      expect(body.message[0].msg).to.eql('bookingDate is required')
      expect(body.message[0].param).to.eql('bookingDate')
      expect(body.message[0].location).to.eql('body')
    })
  })

  describe('PUT Order: /api/vi/orders/:id', () => {
    it('should return an error message if a valid params is provided with invalid order Id', async () => {
      const { body } = await request
        .put(`/api/v1/orders/wrong_id`)
        .send({
          title: "Order title 1 Updated",
          bookingDate: 1554284950000
        })
        .set({ authorization: token })
        .expect(404);
      
      expect(body.success).to.eql(false)
      expect(body.message).to.eql('Order with Id=wrong_id not found')
    })
  })

  describe('PUT Order: /api/vi/orders/:id', () => {
    it('should return an updated order matching the order param provided', async () => {
      const { body } = await request
        .put(`/api/v1/orders/hKlIKPoZc2xCKGTUKZK01`)
        .send({
          title: "Order title 1 Updated",
          bookingDate: 1554284950000
        })
        .set({ authorization: token })
        .expect(200);

      expect(body.success).to.eql(true)
      expect(body.message).to.eql('Updated successfuly')
      expect(body.data.title).to.eql('Order title 1 Updated')
    })
  })

  describe('POST Order: /api/vi/orders', () => {
    it('should return a validation error message if some input are not provided', async () => {
      const { body } = await request
        .post(`/api/v1/orders`)
        .set({ Authorization: token })
        .send(missingTitle)
        .expect(422);
      
      expect(body.success).to.eql(false)
      expect(body.message[0].msg).to.eql('Title is required')
      expect(body.message[0].param).to.eql('title')
      expect(body.message[0].location).to.eql('body')
    })
  })

  describe('POST Order: /api/vi/orders', () => {
    it('should return created order when all inputs are provided', async () => {
      const { body } = await request
        .post(`/api/v1/orders`)
        .set({ Authorization: token })
        .send(completeData)
        .expect(201);

      expect(body.success).to.eql(true)
      expect(body.message).to.eql('Order created successfully')
      expect(body.data.title).to.eql(completeData.title)
    })
  })
})
