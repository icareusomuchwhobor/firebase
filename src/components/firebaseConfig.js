import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAh0DkL3rR4Da9zcyNq-2n3Ysm7td5KplY",
  authDomain: "reactwebapp-dc207.firebaseapp.com",
  projectId: "reactwebapp-dc207",
  storageBucket: "reactwebapp-dc207.firebasestorage.app",
  messagingSenderId: "527626512914",
  appId: "1:527626512914:web:054a822a20b993144e06cb",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db, collection, getDocs, addDoc, updateDoc, deleteDoc, doc };
