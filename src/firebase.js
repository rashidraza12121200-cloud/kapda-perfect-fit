import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAChWP-lu3xFg-Wlr-iDNgl-bAxi2eXAjs",
  authDomain: "kapdaplus.firebaseapp.com",
  projectId: "kapdaplus",
  storageBucket: "kapdaplus.firebasestorage.app",
  messagingSenderId: "532093065246",
  appId: "1:532093065246:web:ffdcd6105c85f6dc4ab60f",
  measurementId: "G-R1FFWJR10B",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
