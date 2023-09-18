import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBv--_zmPdDyEbT_8Rwar0LBSl1k7JTm3Q",
  authDomain: "phonebook-project-793d7.firebaseapp.com",
  projectId: "phonebook-project-793d7",
  storageBucket: "phonebook-project-793d7.appspot.com",
  messagingSenderId: "310366718524",
  appId: "1:310366718524:web:e6f874033a4651e0ac5139",
  measurementId: "G-M4G973RGP6"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)