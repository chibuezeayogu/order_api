import { config } from 'dotenv';
import firebase from 'firebase-admin';
import FirestoreMock from 'firestore-mock';
import firebaseConfig from './firebaseConfig';

config();
export const adminFirebase = firebase.initializeApp({
  credential: firebase.credential.cert(firebaseConfig),
  databaseURL: process.env.DATABASE_URL
})

const db = process.env.NODE_ENV === 'test' ? new FirestoreMock() : adminFirebase.firestore();

export default db;
