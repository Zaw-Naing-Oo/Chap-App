
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAWkm0GVqUC1rHHyneh2SRTgEyY77cmsRA",
  authDomain: "reactchapapp-491d0.firebaseapp.com",
  projectId: "reactchapapp-491d0",
  storageBucket: "reactchapapp-491d0.appspot.com",
  messagingSenderId: "77317293883",
  appId: "1:77317293883:web:c1c0eae0d681df06fe591e",
  measurementId: "G-CFD4DJ9WJ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()