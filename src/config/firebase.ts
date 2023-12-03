// Import the functions you need from the SDKs you need
import { getStorage } from "@firebase/storage";
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {collection, getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDU3bqFLdV_H0006JR0Da5CQcmRMMhL5Js",
  authDomain: "tiptop-crystal.firebaseapp.com",
  projectId: "tiptop-crystal",
  storageBucket: "tiptop-crystal.appspot.com",
  messagingSenderId: "1035795186617",
  appId: "1:1035795186617:web:a92aeb12c907bd48d02c68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app);
export const groupsRef = collection(db, "groups");
export const usersRef = collection(db, "users");
export const postsRef = collection(db, "posts");

export const admin = "yg7jvluctOXOgPAobvUmrGBQ4tU2"

