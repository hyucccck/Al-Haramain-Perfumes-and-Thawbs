// Import perfumes array
import { thawbs } from "/JS Files/thawbs.js";

// Function to parse URL and get encodedName
const getEncodedName = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("name");
};

// Function to find product by name
const getProductByName = (encodedName) => {
  const decodedName = decodeURIComponent(encodedName);
  return thawbs.find(product => product.productName === decodedName);
};

const reviewContainer = document.querySelector(".container");

const product = getProductByName(getEncodedName());

document.getElementById("thawb-name").textContent = product.productName;
document.getElementById("company-name").textContent = product.companyName;
document.getElementById("overall-rating").textContent = product.overallRating + "/5";

// Loop through the reviews of the perfume and append each review dynamically
product.reviews.forEach((review) => {
  const reviewDiv = document.createElement("div");
  reviewDiv.classList.add("review");

  reviewDiv.innerHTML = `
    <div class="col1">
      <h2 id="reviewer">${review.reviewerName}</h2>
      <p id="reviewText">${review.reviewText}</p>
    </div>
    <h2 class="overall-rating">${review.rating}/5</h2>
  `;

  reviewContainer.appendChild(reviewDiv);

  const hr = document.createElement("hr");
  reviewContainer.appendChild(hr);
});
