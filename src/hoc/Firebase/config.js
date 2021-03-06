import app from "firebase/app";
import "firebase/database";
import "firebase/storage";

const REACT_APP_FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
const REACT_APP_FIREBASE_AUTH_DOMAIN = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
const REACT_APP_FIREBASE_DATABASE_URL = process.env.REACT_APP_FIREBASE_DATABASE_URL;
const REACT_APP_FIREBASE_PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const REACT_APP_FIREBASE_STORAGE_BUCKET = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
const REACT_APP_FIREBASE_MESSAGING_SENDER_ID = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;
const REACT_APP_FIREBASE_APP_ID = process.env.REACT_APP_FIREBASE_APP_ID;

const config = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: REACT_APP_FIREBASE_DATABASE_URL,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.db = app.database();
    this.storage = app.storage();
  }

  product = id => this.db.ref(`products`).orderByChild('id').equalTo(id);
  products = () => this.db.ref(`products`);

  uploadProduct = () => this.storage.ref(`images`);
  
}
export default Firebase;