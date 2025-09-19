import { database, auth } from './config.js';
import { ref, set } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// Function to write user data to Realtime Database
function writeUserData(userId, firstName, lastName, email) {
  console.log('Writing user data for:', userId);
  set(ref(database, 'users/' + userId), {
    firstName: firstName,
    lastName: lastName,
    email: email
  }).then(() => {
    console.log('User data written successfully');
    alert('User registered successfully!');
    window.location.href = 'dashboard.html';
  }).catch((error) => {
    console.error('Error writing user data:', error.code, error.message);
    alert('Error storing user data: ' + error.message);
  });
}

// Registration form submission
const registerForm = document.getElementById('nameForm');
if (registerForm) {
  registerForm.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log('Registration form submitted');

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('emailCreate').value;
    const password = document.getElementById('passwordCreate').value;

    console.log('Registration data:', { firstName, lastName, email, password });

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User created:', user.uid);
        writeUserData(user.uid, firstName, lastName, email);
      })
      .catch((error) => {
        console.error('Registration error:', error.code, error.message);
        let errorMessage = error.message;
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'This email is already registered.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Invalid email format.';
        } else if (error.code === 'auth/weak-password') {
          errorMessage = 'Password should be at least 6 characters.';
        }
        alert('Registration failed: ' + errorMessage);
      });
  });
} else {
  console.error('Registration form not found');
}

// Login form submission
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log('Login form submitted');

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log('Login data:', { email, password });

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('User logged in:', userCredential.user.uid);
        alert('Login successful!');
        window.location.href = 'dashboard.html';
      })
      .catch((error) => {
        console.error('Login error:', error.code, error.message);
        let errorMessage = error.message;
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          errorMessage = 'Invalid email or password.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Invalid email format.';
        }
        alert('Login failed: ' + errorMessage);
      });
  });
} else {
  console.error('Login form not found');
}

// Monitor authentication state
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log('User is logged in:', user.uid);
  } else {
    console.log('No user is logged in.');
  }
});