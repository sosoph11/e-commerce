document.addEventListener("DOMContentLoaded", () => {
    // Obtener elementos del DOM
    let cartItemsContainer = document.querySelector(".cart-items");
    let emptyCartMessage = document.getElementById("empty-cart-message");
    let cartSummary = document.querySelector(".cart-summary");
    let continueShoppingButton = document.querySelector(".btn-continue-shopping");
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let shippingOptions = document.querySelectorAll("input[name='shipping']");

    // Función para actualizar el badge del carrito
    function updateCartBadge() {
        let totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
        document.getElementById("cart-badge").textContent = totalQuantity;
    }

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
        updateCartBadge(); // Actualiza el badge cada vez que se renderiza el carrito
    }

    // Función para actualizar el resumen del carrito
    function updateCartSummary() {
        let totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        let totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

        cartSummary.querySelector(".total-price").textContent = `US$${totalPrice}`;
        cartSummary.querySelector(".total-quantity").textContent = `Productos (${totalQuantity})`;

        // Obtiene el porcentaje del tipo de envío seleccionado
        let shippingRate = parseFloat(document.querySelector("input[name='shipping']:checked")?.value || 0);

        // Calcula el total con el porcentaje de envío
        let totalWithShipping = totalPrice + (totalPrice * shippingRate);
        cartSummary.querySelector(".total-with-shipping").textContent = `US$${totalWithShipping.toFixed(2)}`;
    }

    // Actualiza el resumen al seleccionar un tipo de envío
    shippingOptions.forEach(option => option.addEventListener("change", updateCartSummary));

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
    
    // Selecciona todos los encabezados (h5)
    document.querySelectorAll(".shipping-options h5").forEach((header) => {
    header.addEventListener("click", function () {
      const details = this.nextElementSibling;
      const icon = this.querySelector(".icon");

      if (details.style.display === "none" || !details.style.display) {
        details.style.display = "block";
        icon.classList.add("rotated");
      } else {
        details.style.display = "none";
        icon.classList.remove("rotated");
      }
    });
  });
    
    // Botón de "Seguir Comprando"
    continueShoppingButton.addEventListener("click", () => {
        window.location.href = "categories.html"; // Cambia esto a la URL de la página de categorías o productos
    });
    
    const feedback = document.getElementById("feedback");

    // Función para mostrar feedbacks al usuario
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

    // Mostrar/Ocultar campos según la opción seleccionada
document.querySelectorAll('input[name="payment"]').forEach((input) => {
    input.addEventListener("change", () => {
      document.getElementById("credit-card-fields").style.display =
        input.id === "credit-card" ? "block" : "none";
      document.getElementById("bank-transfer-fields").style.display =
        input.id === "bank-transfer" ? "block" : "none";
    });
  });

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
        isValid = false;
}

    // Validar forma de pago
    const paymentSelected = document.querySelector('input[name="payment"]:checked');
    if (!paymentSelected) {
        isValid = false;
    } else {
        // Validar campos específicos de la forma de pago seleccionada
        if (paymentSelected.id === "credit-card") {
          ["card-number", "expiry-date", "cvc"].forEach((id) => {
            const field = document.getElementById(id);
            if (!validateField(field)) {
              isValid = false;
            }
          });
        } else if (paymentSelected.id === "bank-transfer") {
          const bankField = document.getElementById("bank-account");
          if (!validateField(bankField)) {
            isValid = false;
          }
        }
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
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
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
    localStorage.removeItem("cartItems"); // Limpiar carrito

    // Esperar un momento antes de iniciar la animación y redirigir
    setTimeout(() => {
    // Aplicar animación de desvanecimiento
    feedback.classList.add("fade-out");

    // Después de que la animación termine, redirigir al usuario
    setTimeout(() => {
        location.href = "categories.html"; // Redirige a la página de categorías
    }, 1000); // Espera 1 segundo (coincide con la duración de la animación)
}, 1000); // Mostrar feedback por 1 segundo antes de iniciar la animación
});
    // Inicializa el carrito en el DOM
    renderCart();
});
