import { config } from 'dotenv';
import firebase from 'firebase-admin';
import FirestoreMock from 'firebase-mock';
import firebaseConfig from './firebaseConfig';

config();
firebase.initializeApp({
  credential: firebase.credential.cert(firebaseConfig),
  databaseURL: process.env.DATABASE_URL
})

const db = process.env.NODE_ENV === 'test' ? FirestoreMock : firebase.firestore();

export default db;
