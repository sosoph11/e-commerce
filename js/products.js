document.addEventListener("DOMContentLoaded", function () {
    const url = `https://japceibal.github.io/emercado-api/cats_products/101.json`; 
    const productsContainer = document.getElementById("products-container");
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.catID === 101) {
          productsContainer.innerHTML = "";
          data.products.forEach(product => {
            const productCard = document.createElement("div");
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
          console.error("Categoría no coincide. Esperado: 101, Obtenido: " + data.catID);
        }
      })
      .catch(error => {
        console.error("Error al cargar los productos:", error);
      })
      .catch(networkError => {
        console.error("Error de red:", networkError);
      });
  });