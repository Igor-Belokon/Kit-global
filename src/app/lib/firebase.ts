import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCINWB_VLhfm-ix0QQEyGwkdZNt4s9M4jE',
  authDomain: 'kit-global-eb5b3.firebaseapp.com',
  projectId: 'kit-global-eb5b3',
  storageBucket: 'kit-global-eb5b3.appspot.com',
  messagingSenderId: '707791263608',
  appId: '1:707791263608:web:fa0e7274728618ae899a8d',
  measurementId: 'G-HMF51LT15V',
};

// Чтобы избежать ошибки повторной инициализации в Next.js
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Инициализация Firestore
export const db = getFirestore(app);
