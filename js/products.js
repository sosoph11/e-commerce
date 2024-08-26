document.addEventListener("DOMContentLoaded", function () {
  let catID = localStorage.getItem("catID");
  let url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`; 
  let productsContainer = document.getElementById("products-container");

  fetch(url)
    .then(response => response.json())
    .then(data => {
      productsContainer.innerHTML = ""; // Limpiar el contenedor de productos

      // Verifica si la categoría es de autos
      if (catID === "101") {
        data.products.forEach(product => {
          let productCard = document.createElement("div");
          productCard.className = "product-card col-md-4";
          productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <div class="price">${product.currency} ${product.cost}</div>
            <div class="sold">${product.soldCount} Vendidos</div>
          `;
          productsContainer.appendChild(productCard);
        });
      } else {
        // Si la categoría no es autos, muestra "Funcionalidad en desarrollo"
        productsContainer.innerHTML = `
          <div class="alert alert-danger text-center" role="alert">
            <h4 class="alert-heading">Funcionalidad en desarrollo</h4>
          </div>
        `;
      }
    })
    .catch(error => {
      console.error("Error al cargar los productos:", error);
    });
});
