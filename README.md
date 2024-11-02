Se le agregan algunos datos de ejemplos como un usuarios, viajes de ejemplos en el Home y al cambiar la contraseña por olvido se genera un codigo que se muestra por consola para para realizar el cambio de contraseña y al entrar en el inicio de sesion se genera un usuario automaticamente


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgTjZXxS4j4vvoXFeAPay_joR6DQdrgH0",
  authDomain: "tellevoapp-v1.firebaseapp.com",
  projectId: "tellevoapp-v1",
  storageBucket: "tellevoapp-v1.appspot.com",
  messagingSenderId: "551892311991",
  appId: "1:551892311991:web:17ab67a2bad9120129d232",
  measurementId: "G-LF1MJLPTDR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


---Fire Base ---
npm install firebase
npm install -g firebase-tools

-- uuid --
npm install uuid
npm install -g uuid