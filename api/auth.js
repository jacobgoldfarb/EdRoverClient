import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
     setPersistence, browserLocalPersistence, onAuthStateChanged} from "firebase/auth";
import { collection, query, where, getDocs, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase"

const createAccount = async (email, password) => {
    const userExists = await checkIfUserExists(email)
    if (userExists) { return Error("User already exists.") }
    const auth = getAuth();
    await setPersistence(auth, browserLocalPersistence);
    try {
        var userCred = await createUserWithEmailAndPassword(auth, email, password);
        return userCred?.user
    } catch (error) {
        return error
    }
};

const checkIfUserExists = async (email) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return (querySnapshot.docs.length) != 0
}

const signIn = async (email, password) => {
    const auth = getAuth();
    await setPersistence(auth, browserLocalPersistence);
    var userCred = await signInWithEmailAndPassword(auth, email, password)
     .catch((error) => {
        return error;
    });
    return userCred
}

const getAuthenticatedUser = (callback) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
        callback(user)
        return
    }
    onAuthStateChanged(auth, (user) => {
        callback(user);
    });
}

const createUser = async (email, user, name) => {
    var newUser = {
        name: name,
        timestamp: serverTimestamp(),
        created_at: serverTimestamp(),
        email: email,
        bookmarks: []
    }
    try {
        await setDoc(doc(db, "users", user.uid), newUser);
    } catch (error) {
        return error
    }
}

const getUserData = async (uid) => {
    try {
        var docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);
        return docSnap.data()
    } catch(error) {
        return error
    }
};

export { createAccount, signIn, getAuthenticatedUser, createUser, getUserData };
