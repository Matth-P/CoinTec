import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9MVF2V3t3CsaY9nbQGE4btx8BH73gzSA",
  authDomain: "projeto-4-18db2.firebaseapp.com",
  databaseURL: "https://projeto-4-18db2-default-rtdb.firebaseio.com",
  projectId: "projeto-4-18db2",
  storageBucket: "projeto-4-18db2.firebasestorage.app",
  messagingSenderId: "461528490181",
  appId: "1:461528490181:web:4056467f5812556d9690ac",
  measurementId: "G-FL9MXESN54"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };