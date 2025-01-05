import { thawbs } from '/JS Files/thawbs.js';

// Select elements
const searchBar = document.getElementById("search-bar");
const productGrid = document.getElementById("product-grid");

// Function to display products with click navigation
window.displayProducts = function(filteredProducts) {
  productGrid.innerHTML = ""; // Clear grid

  filteredProducts.forEach(thawb => {
    const productDiv = document.createElement("div");
    productDiv.className = "product-thumbnail";

    productDiv.innerHTML = `
      <img src="${thawb.images.thumbnail}" alt="${thawb.productName}">
      <div class="product-info">
        <span class="name">${thawb.productName}</span>
        <span class="price">RM${thawb.price.small.toFixed(2)}</span>
      </div>
    `;

    productDiv.addEventListener("click", () => {
      const encodedName = encodeURIComponent(thawb.productName);
      window.location.href = `thawbProductPage.html?name=${encodedName}`;
    });

    productGrid.appendChild(productDiv);
  });
}

// Initial display of all products
displayProducts(thawbs);

// Search functionality
searchBar.addEventListener("input", () => {
  const query = searchBar.value.toLowerCase();
  const filteredProducts = thawbs.filter(thawb => 
    thawb.productName.toLowerCase().includes(query) || 
    thawb.companyName.toLowerCase().includes(query)
  );
  displayProducts(filteredProducts);
});
