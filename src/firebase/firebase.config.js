// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAL3QUiRWpaaK2H7xa4u6-e7o39mioYaYQ",
  authDomain: "user-email-passwoed-auth.firebaseapp.com",
  projectId: "user-email-passwoed-auth",
  storageBucket: "user-email-passwoed-auth.appspot.com",
  messagingSenderId: "1098265601956",
  appId: "1:1098265601956:web:9f57419700ac36eaac8331"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;