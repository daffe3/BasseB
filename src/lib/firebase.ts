import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // Import Firestore

const firebaseConfig = {
  apiKey: typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config).apiKey : process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config).authDomain : process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config).projectId : process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config).storageBucket : process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config).messagingSenderId : process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config).appId : process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);

export { db };