// Import perfumes array
import { perfumes } from "/JS Files/perfumes.js";
// Check if user is logged in
const loggedInUser = localStorage.getItem('loggedInUser');
let userCart;
if (loggedInUser) {
  userCart = JSON.parse(localStorage.loggedInUserCart || "[]");
}

// Function to parse URL and get encodedName
const getEncodedName = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("name");
};

// Function to find product by name
const getProductByName = (encodedName) => {
  const decodedName = decodeURIComponent(encodedName);
  return perfumes.find(product => product.productName === decodedName);
};

// Function to dynamically update the page
const updatePageContent = (product) => {
  if (!product) {
    alert("Product not found!");
    window.location.href = "perfumeShop.html"; // Redirect if product not found
    return;
  }

  // Update content dynamically
  document.querySelector("title").textContent = product.productName + " - Al Haramain Perfumes & Thawbs"
  document.querySelector("h1").textContent = product.productName;
  document.querySelector("h2").textContent = product.companyName;
  document.getElementById("overall-rating").textContent = product.overallRating + "/5";
  document.getElementById("description").textContent = product.description;
  document.getElementById("review-link").href = `perfumeReviews.html?name=${encodeURIComponent(product.productName)}`;

  // Dynamically update product image
  document.querySelector(".left").style.backgroundImage = `url(${product.images.main})`;
  document.querySelector(".left").style.backgroundSize = 'cover'; // Optional, for covering the div
  document.querySelector(".left").style.backgroundPosition = 'center'; // Optional, to center the image
  document.querySelector(".left").style.backgroundRepeat = 'no-repeat'; // Optional, to prevent the image from repeating  
};

// Initialize the product page
const initializePage = () => {
  const encodedName = getEncodedName();
  if (!encodedName) {
    alert("Invalid product link!");
    window.location.href = "perfumeShop.html"; // Redirect if no name provided
    return;
  }

  const product = getProductByName(encodedName);
  updatePageContent(product);
};

// Run the initialization function
initializePage();

const basePrice = getProductByName(getEncodedName()).price.toFixed(2); // Base price in MYR
let quantity = 1;
let currentCurrency = "MYR";
let exchangeRate = 0.23; // Placeholder for MYR to USD

const quantitySpan = document.getElementById("quantity");
const totalPriceSpan = document.getElementById("total-price");
const currentCurrencyDisplay = document.getElementById("currency");
const decrementButton = document.getElementById("decrement");
const incrementButton = document.getElementById("increment");
const myrToggle = document.getElementById("myr-toggle");
const usdToggle = document.getElementById("usd-toggle");

const updatePrice = async () => {
  let price = basePrice * quantity;

  if (currentCurrency === "USD") {
    price *= exchangeRate;
  }

  totalPriceSpan.textContent = `${price.toFixed(2)}`;
  currentCurrencyDisplay.textContent = ` ${currentCurrency}`;
};

const fetchExchangeRate = async () => {
  try {
    const response = await fetch("https://api.exchangerate-api.com/v4/latest/MYR");
    const data = await response.json();
    exchangeRate = data.rates.USD;
  } catch (error) {
    console.error("Failed to fetch exchange rate:", error);
  }
};

decrementButton.addEventListener("click", () => {
  if (quantity > 1) {
    quantity--;
    quantitySpan.textContent = quantity;
    updatePrice();
  }
});

incrementButton.addEventListener("click", () => {
  if (quantity < 5) {
    quantity++;
    quantitySpan.textContent = quantity;
    updatePrice();
  }
});

myrToggle.addEventListener("click", () => {
  currentCurrency = "MYR";
  myrToggle.classList.add("active");
  usdToggle.classList.remove("active");
  updatePrice();
});

usdToggle.addEventListener("click", async () => {
  currentCurrency = "USD";
  usdToggle.classList.add("active");
  myrToggle.classList.remove("active");
  if (!exchangeRate) await fetchExchangeRate();
  updatePrice();
});

window.buyNow = function() {
  if (loggedInUser) {
    userCart.push({"productName":getEncodedName(),"type":"Perfume","quantity":quantity});
    localStorage.setItem('loggedInUserCart', JSON.stringify(userCart));
    window.location.href = "cart.html"
  } else {
    window.location.href = "login.html";
  }
}

window.addToCart = function() {
  if (loggedInUser) {
    userCart.push({"productName":getEncodedName(),"type":"Perfume","quantity":quantity});
    localStorage.setItem('loggedInUserCart', JSON.stringify(userCart));
  } else {
    window.location.href = "login.html";
  }
}

// Initialize
fetchExchangeRate();
updatePrice();
