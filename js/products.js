document.addEventListener("DOMContentLoaded", function () {
  let catID = localStorage.getItem("catID");
  let url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`; 
  let productsContainer = document.getElementById("products-container");
  let categoryTitle = document.getElementById("category-title");

  fetch(url)
    .then(response => response.json())
    .then(data => {
      productsContainer.innerHTML = "";
      categoryTitle.textContent = data.catName;

      if (data.products) {
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