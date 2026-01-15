// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-logo-generator-30f20.firebaseapp.com",
  projectId: "ai-logo-generator-30f20",
  storageBucket: "ai-logo-generator-30f20.firebasestorage.app",
  messagingSenderId: "623254845168",
  appId: "1:623254845168:web:2e06196585d71ffb15b435"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);