// import firebase from 'firebase';
import 'firebase/auth';
import {initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD5rOlRCNZOTXkvW2jzY4PcrQdaU47TAi4",
  authDomain: "olx-demo-14231.firebaseapp.com",
  projectId: "olx-demo-14231",
  storageBucket: "olx-demo-14231.appspot.com",
  messagingSenderId: "585976371598",
  appId: "1:585976371598:web:ff6ec005e042c4e4c0ecdf",
  measurementId: "G-N2BX5LK162"
};

// export default firebase.initializeApp(firebaseConfig)
export const Firebase = initializeApp(firebaseConfig)
export const db = getFirestore(Firebase)
export const storage = getStorage(Firebase);




