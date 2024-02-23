// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";



let firebaseConfig = {
    apiKey: "AIzaSyDH9vzE22z1DKPuRwrQ4fXJ0GnOIe9MXzc",
    authDomain: "web-submit-f5a35.firebaseapp.com",
    databaseURL: "https://web-submit-f5a35-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "web-submit-f5a35",
    storageBucket: "web-submit-f5a35.appspot.com",
    messagingSenderId: "736107047339",
    appId: "1:736107047339:web:4f2b25cf59e89af20c4aee"
};

// firebase.initializeApp(firebaseConfig);

// let messagesRef = firebase.database()
//     .ref('Collected Data');

// document.getElementById('contactForm')
//     .addEventListener('submit', submitForm);

// function submitForm(e) {
//     e.preventDefault();

//     // Get values
//     let name = getInputVal('name');
//     let email = getInputVal('email');

//     saveMessage(name, email);
//     document.getElementById('contactForm').reset();
// }

// // Function to get form values
// function getInputVal(id) {
//     return document.getElementById(id).value;
// }

// // Save message to firebase
// function saveMessage(name, email) {
//     let newMessageRef = messagesRef.push();
//     newMessageRef.set({
//         name: name,
//         email: email,
//     });
// }


//  ------------------- EDITED -------------------


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const db = getDatabase(app);

document.getElementById('frmContact').addEventListener('submit', function (e) {
    e.preventDefault();
    set(ref(db, 'users/' + Math.random().toString(36).slice(2, 7)), {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
    });

    alert('Your form is submitted');
    document.getElementById('frmContact').reset();
});