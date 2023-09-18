import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyBZ3MUOxr_YKN-4DAsoyGj_Aba8yv38NfM',
  authDomain: 'microai-c7df4.firebaseapp.com',
  projectId: 'microai-c7df4',
  storageBucket: 'microai-c7df4.appspot.com',
  messagingSenderId: '384089301835',
  appId: '1:384089301835:web:5e1b8612a3389b1a497ece',
  measurementId: 'G-SVDGPJ0MR9',
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore();

export { app, db };
