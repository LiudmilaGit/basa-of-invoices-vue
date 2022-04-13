import firebase from 'firebase/app';
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: 'AIzaSyA713e63JSD4mZXwnPL4MPoMX7X_vYIkpU',
  authDomain: 'app-invoice-b4fa3.firebaseapp.com',
  projectId: 'app-invoice-b4fa3',
  storageBucket: 'app-invoice-b4fa3.appspot.com',
  messagingSenderId: '986638182807',
  appId: '1:986638182807:web:1e36b9175168fe022e7cd2',
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
