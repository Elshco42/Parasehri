import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Bu config bilgileri "paracekme" adlı Firebase projesine aittir
const firebaseConfig = {
  apiKey: "AIzaSyBkvqBk2HQz7quFy9LM7YszrsWJBMtNu8",
  authDomain: "paracekme-4eb4d.firebaseapp.com",
  projectId: "paracekme-4eb4d",
  storageBucket: "paracekme-4eb4d.appspot.com",
  messagingSenderId: "172870822353",
  appId: "1:172870822353:web:2ed4e31de4157bb8de1092"
};

// Bu app ayrı isimle başlatılır, böylece çakışma olmaz
const adminApp = initializeApp(firebaseConfig, "adminApp");

// Firestore erişimi
export const db = getFirestore(adminApp);