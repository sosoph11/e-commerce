document.addEventListener("DOMContentLoaded", () => {
    // Obtener elementos del DOM
    let cartItemsContainer = document.querySelector(".cart-items");
    let emptyCartMessage = document.getElementById("empty-cart-message");
    let cartSummary = document.querySelector(".cart-summary");
    let continueShoppingButton = document.querySelector(".btn-continue-shopping");
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Función para renderizar el carrito de productos
    function renderCart() {
        cartItemsContainer.innerHTML = ""; // Limpia los items previos

        if (cartItems.length === 0) {
            emptyCartMessage.style.display = "block";
            cartSummary.style.display = "none";
        } else {
            emptyCartMessage.style.display = "none";
            cartSummary.style.display = "block";

            // Renderiza cada item en el carrito
            cartItems.forEach((item, index) => {
                let cartItemHTML = `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" class="item-image">
                        <div class="item-details">
                            <h5 class="item-name">${item.name}</h5>
                            <p class="item-description">${item.description}</p>
                            <p class="item-price">Precio ${item.currency} ${item.cost}</p>
                        </div>
                        <div class="item-controls">
                            <button class="btn-remove" data-index="${index}">🗑️</button>
                            <div class="quantity-controls">
                                <button class="btn-decrease" data-index="${index}">-</button>
                                <span class="quantity">${item.quantity}</span>
                                <button class="btn-increase" data-index="${index}">+</button>
                            </div>
                        </div>
                    </div>`;
                cartItemsContainer.insertAdjacentHTML("beforeend", cartItemHTML);
            });

            // Actualiza el resumen de precios y cantidad de productos
            updateCartSummary();
        }
    }

    // Función para actualizar el resumen del carrito
    function updateCartSummary() {
        let totalPrice = cartItems.reduce((total, item) => total + item.cost * item.quantity, 0);
        cartSummary.querySelector(".total-price").textContent = `$${totalPrice}`;
        let totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
        cartSummary.querySelector(".total-quantity").textContent = `Productos (${totalQuantity})`;
        document.querySelector(".cart-count").textContent = totalQuantity; // Actualiza el contador en la interfaz
    }

    // Event Listeners para incrementar, decrementar y eliminar productos
    cartItemsContainer.addEventListener("click", (e) => {
        let index = e.target.dataset.index;
        if (e.target.classList.contains("btn-increase")) {
            cartItems[index].quantity += 1;
        } else if (e.target.classList.contains("btn-decrease")) {
            if (cartItems[index].quantity > 1) {
                cartItems[index].quantity -= 1;
            }
        } else if (e.target.classList.contains("btn-remove")) {
            cartItems.splice(index, 1);
        }
        localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Actualizar `localStorage`
        renderCart();
    });

    // Botón de "Seguir Comprando"
    continueShoppingButton.addEventListener("click", () => {
        window.location.href = "categories.html"; // Cambia esto a la URL de la página de categorías o productos
    });

    // Inicializa el carrito en el DOM
    renderCart();
});
