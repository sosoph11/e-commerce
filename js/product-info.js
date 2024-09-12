document.addEventListener('DOMContentLoaded', async function () {
    // Obtener el productID del localStorage
    let productID = localStorage.getItem("productID");
    
    // URL de la API para obtener la información del producto
    let url = `https://japceibal.github.io/emercado-api/products/${productID}.json`;
    
    try {
        let response = await fetch(url);
        let product = await response.json();

    // Mostrar la información del producto
        let productInfoContainer = document.getElementById("product-info-container");
    
        productInfoContainer.innerHTML = `
        <p><strong>Categoria:</strong> ${product.category}</p> 
            <div class="col-md-6">
                <div id="product-images" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        ${product.images.map((img, index) => `
                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                        <img src="${img}" class="d-block w-100" alt="${product.name}">
                    </div>
                    `).join('')}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#product-images" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Anterior</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#product-images" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Siguiente</span>
                </button>
                </div>
            </div>
            <div class="col-md-6">
                <h1>${product.name}</h1>
                <p> <strong id="sold-count"> ${product.soldCount} Vendidos </strong> </p>
                <p><strong id="product-price">${product.currency} ${product.cost}</strong> </p>
                <p> ${product.description}</p>
            </div>
    `;
    // <p><strong>Categoria:</strong> ${product.category}</p> 
    } catch (error) {
    console.error("Error al cargar el producto:", error);
    }
});
