import { getQueryParam, fetchProductData } from './utils.js';

(async function () {
  // Get the product ID from the URL query string
  const productId = getQueryParam('id');

  if (!productId) {
    document.getElementById('product-detail').innerHTML = '<h1>Product not found.</h1>';
    return;
  }

  // Fetch product data
  const products = await fetchProductData();
  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    document.getElementById('product-detail').innerHTML = '<h1>Product not found.</h1>';
    return;
  }

  // Build the product detail HTML dynamically
  document.getElementById('product-detail').innerHTML = `
    <h1>${product.name}</h1>
    <img src="${product.image}" alt="${product.name}" />
    <p>${product.description}</p>
    <p>Price: $${product.price}</p>
  `;
})();

document.getElementById("newsletter-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  const email = document.getElementById("email").value;
  const message = document.getElementById("message");

  if (validateEmail(email)) {
    message.textContent = "Thank you for subscribing!";
    message.style.color = "green";
    document.getElementById("email").value = ""; // Clear input field
  } else {
    message.textContent = "Please enter a valid email.";
    message.style.color = "red";
  }
});

// Function to validate email format
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

