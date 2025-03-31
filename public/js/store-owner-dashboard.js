// Store owner dashboard initialization
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const storeOwner = JSON.parse(localStorage.getItem('storeOwner'));
    const store = JSON.parse(localStorage.getItem('store'));
    
    if (!storeOwner || !store) {
        window.location.href = '/store-login.html';
        return;
    }

    loadProducts();
});

// Add product function
async function addProduct(event) {
    event.preventDefault();
    
    const store = JSON.parse(localStorage.getItem('store'));
    const productData = {
        name: document.getElementById('productName').value,
        price: parseFloat(document.getElementById('productPrice').value),
        description: document.getElementById('productDescription').value,
        image: document.getElementById('productImage').value,
        storeId: store.id
    };

    try {
        const response = await fetch('/api/store-owner/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });

        if (!response.ok) {
            throw new Error('Failed to add product');
        }

        const result = await response.json();
        await loadProducts(); // Reload products after adding
        
        // Clear form
        document.getElementById('addProductForm').reset();
    } catch (error) {
        console.error('Error adding product:', error);
        alert('Failed to add product');
    }
}

// Load products function
async function loadProducts() {
    try {
        const store = JSON.parse(localStorage.getItem('store'));
        if (!store || !store.id) {
            throw new Error('Store information not found');
        }

        const response = await fetch(`/api/store-owner/products/${store.id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Display products function
function displayProducts(products) {
    const productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <button onclick="deleteProduct('${product._id}')">Delete</button>
        `;
        productsContainer.appendChild(productElement);
    });
}

// Delete product function
async function deleteProduct(productId) {
    try {
        const store = JSON.parse(localStorage.getItem('store'));
        const response = await fetch(`/api/store-owner/products/${productId}/${store.id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete product');
        }

        await loadProducts(); // Reload products after deletion
    } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
    }
}

// Add event listeners
document.getElementById('addProductForm').addEventListener('submit', addProduct);