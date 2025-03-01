import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./environments/environments.firebase";



const app = initializeApp(firebaseConfig);
/* const auth = getAuth(app); SI QUEREMOS EL AUTENTICATION -- tendriamos q importarlo arriba */
const db = getFirestore(app);

export { db, storage };