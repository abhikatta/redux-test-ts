// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCmfCftwkiFfeV7A6rJRfT54venqSPkMgE",
  authDomain: "shopping-cart-app-rtk-rtl.firebaseapp.com",
  projectId: "shopping-cart-app-rtk-rtl",
  storageBucket: "shopping-cart-app-rtk-rtl.appspot.com",
  messagingSenderId: "199975293829",
  appId: "1:199975293829:web:12f7de1ae60024d1bd6aec",
  measurementId: "G-QCYB8309DF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
type AuthType = typeof auth;

const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, storage, type AuthType };
