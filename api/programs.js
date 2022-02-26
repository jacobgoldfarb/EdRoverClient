import { collection, query, where, getDocs, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase"

const getProgram = async (id) => {
    const querySnap = collection.where(firebase.firestore.FieldPath.documentId(), '=', id).get();
   try {
       const program = db.collection("universities_v2").where("author", "==", user.uid).get()
   } catch (error) {
       return error
   }
}

export { getProgram };
