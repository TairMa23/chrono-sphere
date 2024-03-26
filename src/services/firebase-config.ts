import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyBsaJxWVoVYVi8ELfc53vV627KtOktnY9I",
  authDomain: "chronosphere-d7016.firebaseapp.com",
  projectId: "chronosphere-d7016",
  storageBucket: "chronosphere-d7016.appspot.com",
  messagingSenderId: "338568153436",
  appId: "1:338568153436:web:08146142a431fdbd235999"
};

const app: FirebaseApp = initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);
export const database: Firestore = getFirestore(app);
export const storage = getStorage(app);