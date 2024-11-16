document.addEventListener("DOMContentLoaded", () => {
    // Obtener elementos del DOM
    let cartItemsContainer = document.querySelector(".cart-items");
    let emptyCartMessage = document.getElementById("empty-cart-message");
    let cartSummary = document.querySelector(".cart-summary");
    let continueShoppingButton = document.querySelector(".btn-continue-shopping");
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    updateCartBadge();
    let shippingOptions = document.querySelectorAll("input[name='shipping']");

    // Guardar el carrito actualizado en `localStorage`
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Guardar el carrito actualizado en `localStorage`
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

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
                let subtotal = item.price * item.quantity; // Calcula el subtotal
                let cartItemHTML = `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" class="item-image">
                        <div class="item-details">
                            <h5 class="item-name">${item.name}</h5>
                            <p class="item-description">${item.description}</p>
                            <p class="item-price">Precio ${item.currency} ${item.price}</p>
                            <span class="item-subtotal">Sub-Total: US$${subtotal}</span> <!-- Muestra el subtotal aquí -->
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
        let totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        cartSummary.querySelector(".total-price").textContent = `US$${totalPrice}`;
        let totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
        cartSummary.querySelector(".total-quantity").textContent = `Productos (${totalQuantity})`;

        cartSummary.querySelector(".total-price").textContent = `US$${totalPrice}`;
        cartSummary.querySelector(".total-quantity").textContent = `Productos (${totalQuantity})`;
        
        // Obtiene el porcentaje del tipo de envío seleccionado
        let shippingRate = parseFloat(document.querySelector("input[name='shipping']:checked").value);
        
        // Calcula el total con el porcentaje de envío
        let totalWithShipping = totalPrice + (totalPrice * shippingRate);
        cartSummary.querySelector(".total-with-shipping").textContent = `US$${totalWithShipping.toFixed(2)}`;
    }
        // Actualiza el resumen al seleccionar un tipo de envío
    shippingOptions.forEach(option => option.addEventListener("change", updateCartSummary));

    function updateCartBadge(){
        let totalQuantity = cartItems.reduce((total,item) => total + item.quantity, 0);
        document.getElementById("cart-badge").textContent = totalQuantity;
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
        updateCartBadge();
        updateCartSummary();
    });

const feedback = document.getElementById("feedback");

// Función para mostrar feedback al usuario
function setFeedback(message, isError = true) {
    feedback.textContent = message;
    feedback.style.color = isError ? "red" : "green";
    feedback.style.display = "block";
}

// Función para validar un campo individual
function validateField(field) {
    if (field.value.trim() === "") {
        field.classList.add("invalid");
        return false;
    } else {
        field.classList.remove("invalid");
        return true;
    }
}

function validateForm() {
    let isValid = true;

    // Validar campos de dirección
    const fields = ["departamento", "city", "street", "number", "corner"];
    fields.forEach((id) => {
        const field = document.getElementById(id);
        if (!validateField(field)) {
            isValid = false;
        }
    });

    // Validar tipo de envío
    const shippingSelected = document.querySelector('input[name="shipping"]:checked');
    if (!shippingSelected) {
        setFeedback("Por favor seleccione un tipo de envío.");
        isValid = false;
    }

    // Validar forma de pago
    const paymentSelected = document.querySelector('input[name="payment"]:checked');
    if (!paymentSelected) {
        setFeedback("Por favor seleccione una forma de pago.");
        isValid = false;
    }

    return isValid;
}

// Validación dinámica en tiempo real
document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", () => validateField(input));
});

// Botón "FINALIZAR COMPRA"
document.querySelector(".btn-checkout").addEventListener("click", () => {
    feedback.style.display = "none";

    // Si el carrito está vacío
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        setFeedback("El carrito está vacío. No puede finalizar la compra.");
        return;
    }

    // Validar formulario
    if (!validateForm()) {
        setFeedback("Por favor complete todos los datos obligatorios.");
        return;
    }

    // Si todo está correcto
    setFeedback("¡Compra realizada con éxito!", false);
    localStorage.removeItem("cart"); // Limpiar carrito
});

    // Botón de "Seguir Comprando"
    continueShoppingButton.addEventListener("click", () => {
        window.location.href = "categories.html"; // Cambia esto a la URL de la página de categorías o productos
    });

    // Inicializa el carrito en el DOM
    renderCart();
});