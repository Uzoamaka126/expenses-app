import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { format } from "date-fns";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.db = app.firestore();
  }
  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doGetCurrentUser = () => this.auth.currentUser;
  doSignOut = () => this.auth.signOut();
  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  doCheckIfUserAuthStateChanges = (user) =>
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        const userObj = {
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
          isAnonymous: user.isAnonymous,
          uid: user.uid,
          providerData: user.providerData,
        };
        return userObj;
      } else {
        // User is signed out.
        console.log("user is signed out");
      }
    });

  doGetUserExpenses = (userId) =>
    this.db.collection("Expenses").where("userID", "==", `${userId}`).get();

  doGetSingleExpense = (id) =>
    this.db.doc(`/Expenses/${id}`).get();

  doAddUserExpense = (data) =>
    this.db.collection("Expenses").add({
      userID: data.id,
      expenses_name: data.name,
      year: format(new Date(), "yyyy"),
      month: format(new Date(), "MMMM"),
      day: format(new Date(), "dd"),
      amount: data.amount,
      category_name: data.category,
      vendor: data.vendor,
      createdAt: new Date(),
    });

  doEditUserExpense = (data) => 
    this.db.doc(`/Expenses/${data.id}`).set({
      expenses_name: data.name,
      year: format(new Date(), "yyyy"),
      month: format(new Date(), "MMMM"),
      day: format(new Date(), "dd"),
      amount: data.amount,
      category_name: data.category,
      vendor: data.vendor,
    })
  
  doDeleteUserExpense = (id) => 
    this.db.collection('Expenses').doc(`${id}`).delete()
}

export default Firebase;
