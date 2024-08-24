const products = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
    { id: 3, name: 'Product 3', price: 300 },
    { id: 4, name: 'Product 4', price: 400 },
    { id: 5, name: 'Product 5', price: 500 },
    { id: 6, name: 'Product 6', price: 600 },
];

let cart = [];

const renderProducts = (productsToRender) => {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'bg-white p-4 rounded-lg shadow';
        productCard.innerHTML = `
            <h3 class="text-xl font-bold mb-2">${product.name}</h3>
            <p class="text-gray-700 mb-2">$${product.price}</p>
            <input type="number" min="1" value="1" class="quantity-input w-16 p-1 border rounded mb-2" id="quantity-${product.id}">
            <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsContainer.appendChild(productCard);
    });
};

const renderCart = () => {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '';
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="text-gray-500">Your cart is empty.</p>';
        return;
    }
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'flex justify-between items-center mb-2';
        cartItem.innerHTML = `
            <div>
                <h4 class="text-lg font-bold">${item.name}</h4>
                <p class="text-gray-700">$${item.price} x ${item.quantity}</p>
            </div>
            <div class="flex items-center">
                <button class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700" onclick="removeFromCart(${item.id})">Remove</button>
                <button class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700 ml-2" onclick="decreaseQuantity(${item.id})">-</button>
                <p class="text-gray-700 ml-2">$${item.price * item.quantity}</p>
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });
    document.getElementById('cart-count').innerText = cart.length;
};

const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    const quantity = parseInt(document.getElementById(`quantity-${productId}`).value);
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    renderCart();
};

const removeFromCart = (productId) => {
    cart = cart.filter(item => item.id !== productId);
    renderCart();
};

const decreaseQuantity = (productId) => {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
        } else {
            removeFromCart(productId);
        }
    }
    renderCart();
};

const toggleCart = () => {
    const cartModal = document.getElementById('cart-modal');
    cartModal.classList.toggle('hidden');
};

const searchProducts = () => {
    const query = document.getElementById('search').value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
    renderProducts(filteredProducts);
};

document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    renderCart();
});
