// Sample Products
const products = [
    { id: 1, name: 'Laptop', price: 1000, category: 'electronics', img: 'lap1.jpeg' },
    { id: 2, name: 'Smartphone', price: 500, category: 'electronics', img: 'smartphone.jpeg' },
    { id: 3, name: 'T-Shirt', price: 20, category: 'clothing', img: 'shirts.webp' },
    { id: 4, name: 'Jeans', price: 40, category: 'clothing', img: 'jeans.jpg' }
];

// Initialize cart and user data
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let user = JSON.parse(localStorage.getItem('user')) || null;

// Product List Rendering
const productListEl = document.getElementById('product-list');
function renderProducts(filter = 'all') {
    productListEl.innerHTML = '';
    const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);
    filteredProducts.forEach(product => {
        const productEl = document.createElement('div');
        productEl.className = 'product';
        productEl.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productListEl.appendChild(productEl);
    });
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Update Cart Count in Navbar
function updateCartCount() {
    const cartCountEl = document.getElementById('cart-link');
    cartCountEl.textContent = `Cart (${cart.length})`;
}

// Render Cart
const cartSectionEl = document.getElementById('cart-section');
function renderCart() {
    const cartItemsEl = document.getElementById('cart-items');
    cartItemsEl.innerHTML = '';
    let total = 0;
    cart.forEach(product => {
        const itemEl = document.createElement('div');
        itemEl.innerHTML = `<p>${product.name} - $${product.price}</p>`;
        cartItemsEl.appendChild(itemEl);
        total += product.price;
    });
    document.getElementById('cart-total').textContent = total.toFixed(2);
}

// Handle Checkout
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (user) {
        alert('Checkout Successful! Thank you for your purchase.');
        cart = [];
        localStorage.removeItem('cart');
        updateCartCount();
        renderCart();
    } else {
        alert('Please log in to proceed to checkout.');
    }
});

// User Authentication
const loginSectionEl = document.getElementById('login-section');
const loginLinkEl = document.getElementById('login-link');
if (user) {
    loginLinkEl.textContent = `Logged in as ${user.username}`;
} else {
    loginLinkEl.addEventListener('click', () => {
        loginSectionEl.classList.toggle('hidden');
    });
}

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    user = { username, password };
    localStorage.setItem('user', JSON.stringify(user));
    loginLinkEl.textContent = `Logged in as ${user.username}`;
    loginSectionEl.classList.add('hidden');
});

// Filter Products
document.getElementById('filter').addEventListener('change', (e) => {
    const selectedFilter = e.target.value;
    renderProducts(selectedFilter);
});

// Cart link click
document.getElementById('cart-link').addEventListener('click', () => {
    cartSectionEl.classList.toggle('hidden');
    renderCart();
});

// Initialize
renderProducts();
updateCartCount();

