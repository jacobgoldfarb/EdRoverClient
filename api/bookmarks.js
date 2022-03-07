import { db } from "./firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore"
import { getAuthenticatedUser } from "./auth";

const postBookmark = async (bookmark) => {
    try {
        getAuthenticatedUser( async (user) => {
            if (!user) {
                return Error("No user.")
            }
            var docRef = doc(db, 'users', user.uid);
            await updateDoc(docRef, {
                bookmarks: arrayUnion(bookmark),
            })
        })
    } catch(error) {
        return error
    }
}


const getBookmarks = async (callback) => {
    try {
        getAuthenticatedUser( async (user) => {
            if (!user) {
                return Error("No user.")
            }
            var docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            const docData = docSnap.data()
            console.log('docData', docData)
            callback(docData?.bookmarks)
        })
    } catch(error) {
        return error
    }
}

export { postBookmark, getBookmarks }