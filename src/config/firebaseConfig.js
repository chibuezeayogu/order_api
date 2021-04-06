import { config } from 'dotenv';

config();
const {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  PRIVATE_KEY,
  CLIENT_EMAIL,
} = process.env;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomaain: AUTH_DOMAIN,
  databseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  sotrageBucket: STORAGE_BUCKET,
  messageingSenderID: MESSAGING_SENDER_ID,
  appId: APP_ID,
  private_key: PRIVATE_KEY,
  client_email: CLIENT_EMAIL,
}

export default firebaseConfig;
