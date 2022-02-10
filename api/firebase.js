import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const { initializeAppCheck, ReCaptchaV3Provider } = require("firebase/app-check");
const firebaseConfig = {
  apiKey: "AIzaSyC-bwRlQJ-LxishoiYghs9MLL_PBr5bdJI",
  authDomain: "edrover-2a8cb.firebaseapp.com",
  projectId: "edrover-2a8cb",
  storageBucket: "edrover-2a8cb.appspot.com",
  messagingSenderId: "122696842549",
  appId: "1:122696842549:web:9e9b79ccf7583b33c2607c",
  measurementId: "G-BSJPLYB4L3"
};


const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export {db, auth}