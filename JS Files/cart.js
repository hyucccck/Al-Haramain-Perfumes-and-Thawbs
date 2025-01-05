import { perfumes } from "/JS Files/perfumes.js";
import { thawbs } from "/JS Files/thawbs.js";

const productContainer = document.querySelector(".cart-details");

let userCart = JSON.parse(localStorage.loggedInUserCart || "[]");

function removeCheckoutButton() {
  const emptyCartMessage = document.createElement("h2");
  emptyCartMessage.textContent = "No Products in Cart";
  emptyCartMessage.style = "color: white;";
  productContainer.appendChild(emptyCartMessage);
  const checkoutButton = document.getElementById("checkout");
  checkoutButton.remove();
}

if (userCart.length === 0){
  removeCheckoutButton();
} else {
  // Loop through the prodcuts of the cart and append each product dynamically
  userCart.forEach((product) => {
    const cartProduct = document.createElement("div");
    cartProduct.classList.add("cart-product");

    if(product.type === "Perfume"){
      const perfumeProduct = perfumes.find(perfumeProduct => perfumeProduct.productName === product.productName);

      let totalPrice = perfumeProduct.price * product.quantity;

      cartProduct.innerHTML = `
        <img class="product-img" src="${perfumeProduct.images.thumbnail}" alt="${perfumeProduct.productName}">
        <div class="product-details">
          <h2>${product.productName}</h2>
          <h3>${perfumeProduct.companyName}</h3>
        </div>
        <h2>x${product.quantity}</h2>
        <h2>${totalPrice}RM</h2>
        <button class="remove-item">-</button>
      `;
    } else {
      const thawbProduct = thawbs.find(thawbProduct => thawbProduct.productName === product.productName);
      let orderedSize = product.size;
      let totalPrice = thawbProduct.price[orderedSize] * product.quantity;
      
      cartProduct.innerHTML = `
        <img class="product-img" src="${thawbProduct.images.thumbnail}" alt="${thawbProduct.productName}">
        <div class="product-details">
          <h2>${product.productName}</h2>
          <h3>${thawbProduct.companyName}</h3>
        </div>
        <h2>${orderedSize[0].toUpperCase()}</h2>
        <h2>x${product.quantity}</h2>
        <h2>${totalPrice}RM</h2>
        <button class="remove-item">-</button>
      `;
    }

    productContainer.appendChild(cartProduct);
  });
}

window.onCheckout = function() {
  alert("You will be redirected to a third party site for payment.");
  localStorage.setItem('loggedInUserCart', JSON.stringify([]));
}

// Add event listener to all "Remove Item" buttons
const removeButtons = document.querySelectorAll('.remove-item');

removeButtons.forEach(button => {
  button.addEventListener('click', function () {
    
    const cartProduct = this.closest('.cart-product');
    
    const productName = cartProduct.querySelector('h2').innerText;
    const productQuantity = cartProduct.querySelector('h3').innerText;

    userCart = userCart.filter(product => (product.productName !== productName) && (product.quantity !== productQuantity));

    localStorage.setItem('loggedInUserCart', JSON.stringify(userCart));
    
    if (cartProduct) {
      cartProduct.remove();
    }
    if (userCart.length === 0) {
      removeCheckoutButton();
    }
  });
});
