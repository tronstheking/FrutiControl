import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection,
  onSnapshot 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxzWTFl1erenoy_cdc-9c-pATfPbsnIcc",
  authDomain: "fruticontrol-ff453.firebaseapp.com",
  projectId: "fruticontrol-ff453",
  storageBucket: "fruticontrol-ff453.firebasestorage.app",
  messagingSenderId: "704527896029",
  appId: "1:704527896029:web:c1b3f551f02d34e23f7a34"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { 
  app, 
  auth, 
  db, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut, 
  onAuthStateChanged,
  doc,
  setDoc,
  getDoc,
  collection,
  onSnapshot
};
