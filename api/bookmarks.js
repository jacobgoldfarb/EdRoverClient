import { db } from "./firebase";
import { doc } from "firebase/firestore"
import { getAuthenticatedUser } from "./auth";

const postBookmark = async (bookmarks) => {
    try {
        getAuthenticatedUser( async (user) => {
            if (!user) {
                return Error("No user.")
            }
            var docRef = doc(db, 'users', user.uid);
            await updateDoc(docRef, {
                bookmarks: bookmarks,
            })
        })
    } catch(error) {
        return error
    }
};

export { postBookmark }