import { perfumes } from '/JS Files/perfumes.js';

// Select elements
const searchBar = document.getElementById("search-bar");
const productGrid = document.getElementById("product-grid");

// Function to display products with click navigation
window.displayProducts = function(filteredProducts) {
  productGrid.innerHTML = ""; // Clear grid

  filteredProducts.forEach(perfume => {
    const productDiv = document.createElement("div");
    productDiv.className = "product-thumbnail";

    productDiv.innerHTML = `
      <img src="${perfume.images.thumbnail}" alt="${perfume.productName}">
      <div class="product-info">
        <span class="name">${perfume.productName}</span>
        <span class="price">RM${perfume.price.toFixed(2)}</span>
      </div>
    `;

    productDiv.addEventListener("click", () => {
      const encodedName = encodeURIComponent(perfume.productName);
      window.location.href = `perfumeProductPage.html?name=${encodedName}`;
    });

    productGrid.appendChild(productDiv);
  });
}

// Initial display of all products
displayProducts(perfumes);

// Search functionality
searchBar.addEventListener("input", () => {
  const query = searchBar.value.toLowerCase();
  const filteredProducts = perfumes.filter(perfume => 
    perfume.productName.toLowerCase().includes(query) || 
    perfume.companyName.toLowerCase().includes(query)
  );
  displayProducts(filteredProducts);
});
