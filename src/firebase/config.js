import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzGLvfsvtmo5vRmImp9wjHBoJU3tXu2NQ",
  authDomain: "zarnder-music-website.firebaseapp.com",
  projectId: "zarnder-music-website",
  storageBucket: "zarnder-music-website.firebasestorage.app",
  messagingSenderId: "117116149833",
  appId: "1:117116149833:web:d3ce55f1c4cefc19eddf98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;
