// Check if user is logged in
const loggedInUser = localStorage.getItem('loggedInUser');
const authLinks = document.getElementById('auth-links');

if (loggedInUser) {
  // If user is logged in, change links to "Cart" and "Sign Out"
  authLinks.innerHTML = `
    <a href="../HTML Files/cart.html">Cart</a>
    <p>§</p>
    <a href="#" id="sign-out">Sign Out</a>
  `;

  // Add event listener to the "Sign Out" link
  document.getElementById('sign-out').addEventListener('click', function() {
    // Log out by removing the logged-in user from localStorage
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('loggedInUserCart');
    
    // Redirect to index.html as if not logged in
    window.location.href = '../index.html';
  });
}