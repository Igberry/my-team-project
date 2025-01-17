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
