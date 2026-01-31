// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// @ts-ignore
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8NxW6A2Nx7qOrpEUqyS6UdFBLVIJ355c",
  authDomain: "kidi-karunia-kasih.firebaseapp.com",
  projectId: "kidi-karunia-kasih",
  storageBucket: "kidi-karunia-kasih.firebasestorage.app",
  messagingSenderId: "467863551925",
  appId: "1:467863551925:web:252f4b0d3a451cb27223fc",
  measurementId: "G-Z4BY8MNE0X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Note: Firebase Analytics tidak didukung di React Native/Expo

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
