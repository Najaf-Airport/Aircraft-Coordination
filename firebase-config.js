// firebase-config.js

// إعدادات مشروع Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAENB1CxP4gRmqGfi71Fq2y9O6cBzSN13U",
  authDomain: "najafairportsite.firebaseapp.com",
  projectId: "najafairportsite",
  storageBucket: "najafairportsite.appspot.com",
  messagingSenderId: "855371683567",
  appId: "1:855371683567:web:d1d393c054d17993dfad1a",
  measurementId: "G-Y7341CEWGT"
};

// تهيئة Firebase
firebase.initializeApp(firebaseConfig);

// تعريف الخدمات
const auth = firebase.auth();
const db = firebase.firestore();
