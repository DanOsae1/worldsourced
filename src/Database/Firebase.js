import firebaseConfig from './firebaseConfig';
import firebase from "firebase/app";
import "firebase/firestore"
import "firebase/auth"
import "firebase/analytics"

export default class Firebase {

    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig)
            this.firestore = firebase.firestore()
            this.auth = firebase.auth()
        }
    }
}


