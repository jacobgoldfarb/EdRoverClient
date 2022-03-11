import { db } from "./firebase";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"
import { getAuthenticatedUser } from "./auth";

const SERVICE_URL = new URL('https://ed-rover.herokuapp.com/programs')
const DEV_SERVICE_URL = new URL('http://127.0.0.1:5000/programs')

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

const deleteBookmark = async (bookmark) => {
    try {
        getAuthenticatedUser( async (user) => {
            if (!user) {
                return Error("No user.")
            }
            var docRef = doc(db, 'users', user.uid);
            await updateDoc(docRef, {
                bookmarks: arrayRemove(bookmark),
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
            callback(docData?.bookmarks)
        })
    } catch(error) {
        return error
    }
}

const getProgramsFromBookmarkIds = async (ids) => {
    const joined_ids = ids.join(",")
    var url = SERVICE_URL + "?program_ids=" + joined_ids
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
    const resp = await fetch(url, requestOptions)
    if (resp.status != 200) {
      return Error(resp.statusText)
    }
    const body = await resp.json()
    return body
}

export { postBookmark, deleteBookmark, getBookmarks, getProgramsFromBookmarkIds }