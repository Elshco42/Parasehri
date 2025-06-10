import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYxMtN6OLxwY-SmV9PCb_4buZVRBilmdI",
  authDomain: "parafarming-yeniuser.firebaseapp.com",
  projectId: "parafarming-yeniuser",
  storageBucket: "parafarming-yeniuser.appspot.com", 
  messagingSenderId: "763821867531",
  appId: "1:1234567890:web:abc123xyz456"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 