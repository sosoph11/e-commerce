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

document.addEventListener('DOMContentLoaded', function() {
  const username = localStorage.getItem('username');
  if (username) {
      document.getElementById('user-name').textContent = `${username}`;
  }
});

// Función para cargar la imagen de perfil desde localStorage
document.addEventListener("DOMContentLoaded", () => {
  // Obtiene el elemento de la imagen de perfil en la barra de navegación
  let navbarProfilePic = document.getElementById("navbar-profile-pic");
  
  // Intenta cargar la foto de perfil guardada en localStorage
  let savedPic = localStorage.getItem("profilePic");
  if (savedPic) {
      // Si hay una imagen guardada, actualiza la fuente de la imagen en la barra de navegación
      navbarProfilePic.src = savedPic;
  }

  //dark-mode
  const darkModeSwitch = document.getElementById('darkModeSwitch');

  darkModeSwitch.addEventListener('change', function() {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', darkModeSwitch.checked);
  });

  darkModeSwitch.checked = localStorage.getItem('darkMode') === 'true';
  document.body.classList.toggle('dark-mode', darkModeSwitch.checked);

});
