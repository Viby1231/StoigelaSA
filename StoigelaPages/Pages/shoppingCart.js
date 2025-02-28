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
        itemDiv.innerHTML = `<p>${item.name} - ${item.quantity}x R${item.price}</p>`;
        cartContainer.appendChild(itemDiv);
        total += item.price * item.quantity;
    });

    cartTotal.innerText = `R${total.toFixed(2)}`;
    console.log("Cart updated:", cart);
}

// Run only when the page loads
document.addEventListener('DOMContentLoaded', updateCartDisplay);