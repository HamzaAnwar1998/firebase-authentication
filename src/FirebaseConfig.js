import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCwL4mYYGeuqjkYgktTr3fEp4MlUc7GTm4",
  authDomain: "hamza-portfolio-f30ba.firebaseapp.com",
  projectId: "hamza-portfolio-f30ba",
  storageBucket: "hamza-portfolio-f30ba.appspot.com",
  messagingSenderId: "526692752996",
  appId: "1:526692752996:web:f17741db0f840ad5ee4971",
  measurementId: "G-TWBJEEF714"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export {auth}