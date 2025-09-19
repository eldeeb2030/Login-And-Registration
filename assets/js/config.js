import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAO9vJb6Dj9UaZgXcDELkpGWZ_vRhHPm2U",
  authDomain: "login-and-registration-f8379.firebaseapp.com",
  databaseURL: "https://login-and-registration-f8379-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "login-and-registration-f8379",
  storageBucket: "login-and-registration-f8379.firebasestorage.app",
  messagingSenderId: "631172342219",
  appId: "1:631172342219:web:65234ce2e58a56a252d64e",
  measurementId: "G-S0T73C5CC2"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { database, auth };