import { config } from 'dotenv';
import firebase from 'firebase-admin';
import FirestoreMock from 'firebase-mock';
import firebaseConfig from './config';

config();
firebase.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  databaseURL: process.env.DATABASE_URL
})

const db = process.env.NODE_ENV === 'test' ? new FirestoreMock() : firebase.firestore();

export default db;
