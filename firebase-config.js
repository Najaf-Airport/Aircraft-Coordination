// firebase-config.js

// ضع هنا معلومات مشروعك من Firebase
const firebaseConfig = {
   apiKey: "AIzaSyAENB1CxP4gRmqGfi71Fq2y9O6cBzSN13U",
    authDomain: "najafairportsite.firebaseapp.com",
    projectId: "najafairportsite",
    storageBucket: "najafairportsite.firebasestorage.app",
    messagingSenderId: "855371683567",
    appId: "1:855371683567:web:d1d393c054d17993dfad1a",
    measurementId: "G-Y7341CEWGT"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
