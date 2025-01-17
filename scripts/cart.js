// Function to fetch products from the JSON file (tents.json)
async function fetchCartItems() {
  try {
    const response = await fetch('./tents.json'); // Fetch the product data
    if (!response.ok) {
      throw new Error(`Failed to fetch product data: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched Product List:', data); // Debugging
    return data; // Return the product list
  } catch (error) {
    console.error(error);
    return []; // Return an empty array if the fetch fails
  }
}

// Function to add a product to the cart (stored in localStorage)
function addToCart(product) {
  // Step 1: Retrieve the current cart from localStorage, or create an empty cart if none exists
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Step 2: Check if the product already exists in the cart
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    // If the product exists, increase its quantity
    existingProduct.quantity += 1;
  } else {
    // If the product doesn't exist, add the new product with quantity 1
    product.quantity = 1;
    cart.push(product);
  }

  // Step 3: Save the updated cart back to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  console.log('Updated Cart:', cart); // Debugging
  alert(`${product.name} has been added to the cart!`);
}

// Function to calculate the total cost of cart items
function calculateTotal(cartItems) {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Function to update the cart page (display cart items and total)
async function updateCartPage() {
  // Step 1: Retrieve the current cart from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartFooter = document.querySelector('.cart-footer'); // The footer where the total will be displayed
  const cartItemsContainer = document.getElementById('cart-items'); // The container where the cart items will be listed

  if (cart.length === 0) {
    // If the cart is empty, show a message and hide the footer
    cartFooter.classList.add('hide');
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  // Step 2: Populate the cart items dynamically
  cartItemsContainer.innerHTML = cart
    .map(
      (item) => `
    <div class="cart-item">
      <p>${item.name} (x${item.quantity})</p>
      <p>Price: $${item.price.toFixed(2)}</p>
    </div>
  `
    )
    .join(''); // Join the array of HTML elements into a single string

  // Step 3: Calculate and display the total
  const total = calculateTotal(cart);
  cartFooter.classList.remove('hide'); // Show the footer
  const totalElement = cartFooter.querySelector('.cart-total'); // The element that will display the total
  totalElement.textContent = `Total: $${total.toFixed(2)}`; // Update the total text
}

// Function to handle the Add to Cart button click event on the product detail page
document.querySelectorAll('#add-to-cart-btn').forEach(button => {
  button.addEventListener('click', async () => {
    // Get the product ID from the product detail page
    const productId = parseInt(button.closest('.product-detail').querySelector('input[type="hidden"]').value, 10);
    
    // Fetch the list of products from the JSON file
    const products = await fetchCartItems();
    
    // Find the product by ID
    const product = products.find((item) => item.id === productId);

    if (product) {
      // If the product is found, add it to the cart
      addToCart(product);
    } else {
      alert('Product not found!');
    }
  });
});

// Call updateCartPage when the cart page is loaded
updateCartPage();
