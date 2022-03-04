import { db } from "./firebase";
import { getAuthenticatedUser } from "./auth";
import { doc, setDoc, getDocs, collection } from "firebase/firestore"

const postReview = async (review, programId, callback) => {
    getAuthenticatedUser( async (user) => {
        if (!user) { return }
        try {
            const resp =  await setDoc(doc(db, "reviews", programId, 'userReviews', user.uid), review)
            callback(resp)
        } catch(error) {
            return error
        }

    })
};

const getReview = async (programId) => {
    const querySnapshot = await getDocs(collection(db, "reviews", programId, "userReviews"));
    return querySnapshot.docs.map((doc) => doc.data())
}

export { postReview, getReview }