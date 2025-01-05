import { users } from '/JS Files/users.js';

if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify(users));
}

// Function to handle login
window.handleLogin = function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMessage = document.getElementById("error-message");

  // Reset error message
  errorMessage.textContent = "";

  // Get users from localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Find the account by email and password
  const account = users.find(
    acc => acc.email.toLowerCase() === email.toLowerCase() && acc.password === password
  );

  if (account) {
    // Successful login
    localStorage.setItem("loggedInUser", email); // Store the logged-in user's email

    const user = users.find(user => user.email === email);
    const userCart = user ? user.cart : null;
    localStorage.setItem("loggedInUserCart", JSON.stringify(userCart)); // Store the logged-in user's cart
    
    window.location.href = "/index.html"; // Redirect to homepage
  } else {
    // Failed login
    errorMessage.textContent = "Invalid email or password. Please try again.";
  }
};


// Function to handle registration
window.handleRegister = function() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirm-password").value.trim();
  const errorMessage = document.getElementById("error-message");

  // Reset error message
  errorMessage.textContent = "";

  // Validate email format
  if (!email.includes("@") || !email.endsWith(".com")) {
    errorMessage.textContent = "Email must contain '@' and end with '.com'.";
    return;
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    errorMessage.textContent = "Passwords do not match. Please try again.";
    return;
  }

  // Check if email already exists
  if (users.some(account => account.email === email)) {
    errorMessage.textContent = "This email is already registered.";
    return;
  }

  // Add the new user to the users array
  users.push({ "email":email, "password":password, "cart": [] });

  localStorage.setItem('users', JSON.stringify(users));
  
  window.location.href = "login.html";
}

// Function to redirect to login page
window.redirectToLogin = function() {
  window.location.href = "/HTML Files/login.html";
}

// Function to redirect to register page
window.redirectToRegister = function() {
  window.location.href = "/HTML Files/register.html";
}
