import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore"

const getSchools = async () => {
    const schoolsCollection = collection(db, 'schools');
    const docs = await getDocs(schoolsCollection)    
    var resp = []
    docs.forEach((doc) => resp.push(doc.data()))
    return resp
};

export { getSchools };
