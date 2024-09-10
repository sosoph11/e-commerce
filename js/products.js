document.addEventListener("DOMContentLoaded", function () {
  let catID = localStorage.getItem("catID");
  let url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`; 
  let productsContainer = document.getElementById("products-container");

  let catName = document.querySelector('.catName')

  let options = {
    101: "Autos",
    102: "Juguetes",
    103: "Muebles"
  }

  catName.innerHTML = options[catID]

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
        document.querySelector('main .wrapper').style = 'display: none;'
      }
    })
    .catch(error => {
      console.error("Error al cargar los productos:", error);
    });
});

  // Función para crear la tarjeta "Muy pronto"
  function createSoonCard() {
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
  }

  // Función para filtrar productos por rango de precio
function filterProductsByPrice(minPrice, maxPrice) {
  return products.filter(product => product.cost >= minPrice && product.cost <= maxPrice);
}

// Función para ordenar productos por precio (ascendente o descendente)
function sortProductsByPrice(products, ascending = true) {
  return [...products].sort((a, b) => ascending ? a.cost - b.cost : b.cost - a.cost);
}

// Función para ordenar productos por relevancia (artículos vendidos)
function sortProductsByRelevance(products) {
  return [...products].sort((a, b) => b.soldCount - a.soldCount);
}

// Función para actualizar la vista de productos
function updateProductDisplay(products) {
  displayProducts(products); // Asegúrate de que esta función esté bien definida
}

// Event Listener para filtrar productos
document.getElementById("rangeFilterCount").addEventListener("click", function () {
  let minPrice = parseFloat(document.getElementById("rangeFilterCountMin").value) || 0;
  let maxPrice = parseFloat(document.getElementById("rangeFilterCountMax").value) || Infinity;
  let filteredProducts = filterProductsByPrice(minPrice, maxPrice);
  updateProductDisplay(filteredProducts);
});

// Event Listener para ordenar productos por precio ascendente
document.getElementById("sortAsc").addEventListener("click", function () {
  let sortedProducts = sortProductsByPrice(products, true);
  updateProductDisplay(sortedProducts);
});

// Event Listener para ordenar productos por precio descendente
document.getElementById("sortDesc").addEventListener("click", function () {
  let sortedProducts = sortProductsByPrice(products, false);
  updateProductDisplay(sortedProducts);
});

// Event Listener para ordenar productos por relevancia
document.getElementById("sortByCount").addEventListener("click", function () {
  let sortedProducts = sortProductsByRelevance(products);
  updateProductDisplay(sortedProducts);
});

// Event Listener para limpiar filtros
document.getElementById("clearRangeFilter").addEventListener("click", function () {
  document.getElementById("rangeFilterCountMin").value = '';
  document.getElementById("rangeFilterCountMax").value = '';
  updateProductDisplay(products); // Muestra todos los productos
});




