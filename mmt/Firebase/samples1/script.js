// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

// Paste the code from Firebase
// look for this in the "real time database" settings, get things
const firebaseConfig = {
    apiKey: "AIzaSyDH9vzE22z1DKPuRwrQ4fXJ0GnOIe9MXzc",
    authDomain: "web-submit-f5a35.firebaseapp.com",
    databaseURL: "https://web-submit-f5a35-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "web-submit-f5a35",
    storageBucket: "web-submit-f5a35.appspot.com",
    messagingSenderId: "736107047339",
    appId: "1:736107047339:web:4f2b25cf59e89af20c4aee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const db = getDatabase(app);

document.getElementById('frmContact').addEventListener('submit', function (e) {
    e.preventDefault();
    set(ref(db, 'users/' + Math.random().toString(36).slice(2, 7)), {
        name: document.getElementById('fullname').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    });

    alert('Your form is submitted');
    document.getElementById('frmContact').reset();
});