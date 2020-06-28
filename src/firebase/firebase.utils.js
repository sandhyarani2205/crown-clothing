import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC4N2sbCwdaxt5byA0cZJA_u_mxo7Nc59Q",
    authDomain: "crown-db-7a963.firebaseapp.com",
    databaseURL: "https://crown-db-7a963.firebaseio.com",
    projectId: "crown-db-7a963",
    storageBucket: "crown-db-7a963.appspot.com",
    messagingSenderId: "924003706831",
    appId: "1:924003706831:web:4a608293c6afa7f6a414ba",
    measurementId: "G-K7NW0SBWXG"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch {
            console.log('error');
        }
    }
    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  const provider  = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  export default firebase;