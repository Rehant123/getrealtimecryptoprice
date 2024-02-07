import  {initializeApp} from "firebase/app";
import firebaseConfig from "./config/firebaseConfig";

import  {getAuth} from "firebase/auth"
import{ getFirestore} from 'firebase/firestore';

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore();



export {auth,db};
