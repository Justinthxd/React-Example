import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCjcs-9l_R5tKzLUopIOnXN8gdKsWNNMgE",
    authDomain: "apo-project-7388e.firebaseapp.com",
    databaseURL: "https://apo-project-7388e-default-rtdb.firebaseio.com",
    projectId: "apo-project-7388e",
    storageBucket: "apo-project-7388e.appspot.com",
    messagingSenderId: "695943159687",
    appId: "1:695943159687:web:ef005c0454a5c211fafd22",
    measurementId: "G-92CZ22NYEV"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);