const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

// Función para actualizar el badge del carrito
function updateCartBadge() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartBadge = document.getElementById("cart-badge");

    if (cartBadge) {
        cartBadge.textContent = totalQuantity;
        cartBadge.style.display = totalQuantity > 0 ? "inline-block" : "none"; // Oculta el badge si está vacío
    }
}

// Mostrar nombre de usuario en la barra de navegación si está guardado en localStorage
document.addEventListener('DOMContentLoaded', function() {
  const username = localStorage.getItem('username');
  if (username) {
      document.getElementById('user-name').textContent = `${username}`;
  }
  updateCartBadge(); // Actualiza el badge al cargar la página
});

// Función para cargar la imagen de perfil desde localStorage
document.addEventListener("DOMContentLoaded", () => {
  let navbarProfilePic = document.getElementById("navbar-profile-pic");
  let savedPic = localStorage.getItem("profilePic");
  
  if (savedPic) {
      navbarProfilePic.src = savedPic;
  }

  // Modo oscuro
  const darkModeSwitch = document.getElementById('darkModeSwitch');
  darkModeSwitch.addEventListener('change', function() {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', darkModeSwitch.checked);
  });
  darkModeSwitch.checked = localStorage.getItem('darkMode') === 'true';
  document.body.classList.toggle('dark-mode', darkModeSwitch.checked);
});
