// Replace your existing store loading code with this:
async function loadStores() {
    try {
        const response = await fetch('/api/store/all');
        const stores = await response.json();
        
        const storesContainer = document.getElementById('stores-container'); // Adjust ID based on your HTML
        storesContainer.innerHTML = ''; // Clear existing content
        
        stores.forEach(store => {
            const storeElement = document.createElement('div');
            storeElement.className = 'store-card'; // Maintain your existing CSS classes
            
            storeElement.innerHTML = `
                <h3>${store.username}'s Store</h3>
                <p>Email: ${store.email}</p>
                ${store.store ? `
                    <p>Store Details: ${store.store.name || 'N/A'}</p>
                    <p>Location: ${store.store.location || 'N/A'}</p>
                ` : ''}
                <!-- Add more store details as needed -->
            `;
            
            storesContainer.appendChild(storeElement);
        });
    } catch (error) {
        console.error('Error loading stores:', error);
    }
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', loadStores);