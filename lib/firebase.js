import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration from the Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBWK-SFtOfQUb77syY63rioCYE2Apgl6tM",
  authDomain: "nfc-smart-e3a8b.firebaseapp.com",
  projectId: "nfc-smart-e3a8b",
  storageBucket: "nfc-smart-e3a8b.firebasestorage.app",
  messagingSenderId: "1015325262164",
  appId: "1:1015325262164:web:1094aa2508e298ad6f48c1",
  measurementId: "G-N3RJ2YDMS0"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
