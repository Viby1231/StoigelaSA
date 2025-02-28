// Initialize cart from LocalStorage or create an empty one
console.log("Cart script is loaded");
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add items to the cart
function addToCart(itemName, price) {
    let existingItem = cart.find(item => item.name === itemName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: itemName, price: price, quantity: 1 });
    }

    // Save the updated cart in LocalStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart display on all pages
    updateCartDisplay();
}

// Function to remove an item from the cart
function removeFromCart(itemName) {
    cart = cart.filter(item => item.name !== itemName);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Function to update quantity
function updateQuantity(itemName, quantity) {
    let item = cart.find(item => item.name === itemName);
    if (item) {
        item.quantity = Math.max(1, parseInt(quantity)); // Ensure at least 1
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    updateCartDisplay();
}

// Function to update PayFast form based on cart
// Function to update PayFast form based on cart
function updatePayFastForm() {
    let payFastForm = document.forms['PayFastPayNowForm']; // Get PayFast form
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    // Prepare the cart items and total amount
    let itemNames = cart.map(item => `${item.name} x${item.quantity}`).join(", "); // Concatenate item names and quantities for item_name
    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    // Set the form fields dynamically
    if (payFastForm) {
        payFastForm['amount'].value = total.toFixed(2); // Update the total amount
        payFastForm['item_name'].value = itemNames; // Update item names with quantities
    }
}

// Function to update cart display
function updateCartDisplay() {
    let cartContainer = document.getElementById('cart-items');
    let cartTotal = document.getElementById('cart-total');
    
    // If cart elements aren't on this page, stop running the function
    if (!cartContainer || !cartTotal) {
        console.warn("Cart elements not found on this page, skipping update.");
        return;
    }

    cartContainer.innerHTML = ''; // Clear cart display

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    cart.forEach(item => {
        let itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <p>${item.name} - ${item.quantity}x R${item.price}</p>
            <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.name}', this.value)">
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartContainer.appendChild(itemDiv);
        total += item.price * item.quantity;
    });

    cartTotal.innerText = `R${total.toFixed(2)}`;
    
    // Call updatePayFastForm to update the PayFast payment form
    updatePayFastForm();
}

// Clear cart functionality
function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Run only when the page loads
document.addEventListener('DOMContentLoaded', updateCartDisplay);

// Example: Add item to cart (for testing)

// Call this function to add products to cart manually (for testing or buttons)
addToCartExample();
