// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { firebaseConfig } from "./environments/environments.firebase.ts";



// const app = initializeApp(firebaseConfig);
// /* const auth = getAuth(app); SI QUEREMOS EL AUTENTICATION -- tendriamos q importarlo arriba */
// const db = getFirestore(app);

// export { db };


// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";  // Importar la función de autenticación
import { firebaseConfig } from "./environments/environments.firebase.ts";

// Inicializar la aplicación de Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

// Inicializar Authentication
const auth = getAuth(app);  // Aquí inicializamos la autenticación

// Exportar la instancia de Firestore y Auth
export { db, auth };