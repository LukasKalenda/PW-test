import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAnmXIWRhHieEa2SSzWA75RfxGlZFojRz0",
  authDomain: "lukasweb-cb74f.firebaseapp.com",
  projectId: "lukasweb-cb74f",
  storageBucket: "lukasweb-cb74f.appspot.com",
  messagingSenderId: "895181121596",
  appId: "1:895181121596:web:1ed2a0bde3f08a5bebfb39",
  measurementId: "G-VS1B72MGQQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };