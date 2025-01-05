// Get the elements
const hamburgerMenu = document.getElementById("hamburger-menu");
const navLinks = document.getElementById("nav-links");
const authLinks = document.getElementById("auth-links");

// Toggle the menu when hamburger icon is clicked
hamburgerMenu.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  authLinks.classList.toggle("active");
});

// Function to redirect to perfume shop page
window.redirectToPerfumeShop = function() {
  window.location.href = "../HTML Files/perfumeShop.html";
}
// Function to redirect to thawb shop page
window.redirectToThawbShop = function() {
  window.location.href = "../HTML Files/thawbShop.html";
}


//Trending perfumes and home page reviews handler

import { perfumes } from '../JS Files/perfumes.js';

// Function to shuffle and pick random perfumes
function getRandomPerfumes(perfumeArray, count) {
  const shuffled = perfumeArray.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Select the parent container
const perfumeDisplay = document.getElementById('perfume-display');
const reviewDisplay = document.getElementById('review-display');

// Get 3 random perfumes
const randomPerfumes = getRandomPerfumes(perfumes, 3);

// Loop through the random perfumes and create the elements
randomPerfumes.forEach((perfume) => {
  const perfumeItem = document.createElement('div');
  const reviewItem = document.createElement('div');
  perfumeItem.classList.add('perfume-item');
  reviewItem.classList.add('review-item');
  perfumeItem.id = `${perfume.productName}`;
  reviewItem.id = `${perfume.productName}`;

  const encodedName = encodeURIComponent(perfume.productName);
  let productLink = `../HTML Files/perfumeProductPage.html?name=${encodedName}`;
  let reviewLink = `../HTML Files/perfumeReviews.html?name=${encodedName}`;
  
  perfumeItem.innerHTML = `
    <a href="${productLink}">
      <img src="${perfume.images.thumbnail}" alt="${perfume.productName}">
      <p>${perfume.productName}</p>
    </a>
  `;

  let randomReview = Math.floor(Math.random() * (perfume.reviews.length));

  reviewItem.innerHTML = `
    <a href="${reviewLink}">
      <p>${perfume.overallRating}/5</p>
      <h2>${perfume.productName}</h2>
      <hr>
      <h2>${perfume.reviews[randomReview].reviewerName}</h2>
      <h1>"${perfume.reviews[randomReview].reviewText}"</h1>
    </a>
  `;

  // Append the perfume item to the container
  perfumeDisplay.appendChild(perfumeItem);
  reviewDisplay.appendChild(reviewItem);
});

