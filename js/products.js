document.addEventListener("DOMContentLoaded", function () {
  let catID = localStorage.getItem("catID");
  let url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`; 
  let productsContainer = document.getElementById("products-container");

  fetch(url)
    .then(response => response.json())
    .then(data => {
      productsContainer.innerHTML = ""; // Limpiar el contenedor de productos

      // Mostrar productos de la categoría seleccionada
      if (catID) {
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
        
        // Agregar la tarjeta "Muy pronto"
        let soonCard = document.createElement("div");
        soonCard.className = "col-md-4 mb-4 soon-card"; 
        soonCard.innerHTML = `
          <div class="card h-100 text-white text-center" style="background-color: rgba(0, 0, 0, 0); border: 0">
            <div class="card-body d-flex align-items-center justify-content-center">
              <h5 class="card-title">Muy pronto</h5>
            </div>
          </div>
        `;

        productsContainer.appendChild(soonCard);
        
      
      } else {// Si la categoría no está disponible, muestra "Funcionalidad en desarrollo"
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
