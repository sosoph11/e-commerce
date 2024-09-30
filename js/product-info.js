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
                <p><strong id="sold-count">${product.soldCount} Vendidos</strong></p>
                <p><strong id="product-price">${product.currency} ${product.cost}</strong></p>
                <p>${product.description}</p>
            </div>
            <div class="col-md-6">
                <div class="rating-section">
                    <h2>CALIFICA ESTE ARTÍCULO Y BRINDA TU OPINIÓN</h2>
                    <label for="rating">CALIFICACIÓN:</label>
                    <div class="star-rating">
                        <input type="radio" name="rating" id="star5" value="5"><label for="star5" class="star">★</label>
                        <input type="radio" name="rating" id="star4" value="4"><label for="star4" class="star">★</label>
                        <input type="radio" name="rating" id="star3" value="3"><label for="star3" class="star">★</label>
                        <input type="radio" name="rating" id="star2" value="2"><label for="star2" class="star">★</label>
                        <input type="radio" name="rating" id="star1" value="1"><label for="star1" class="star">★</label>
                    </div>
                    <label for="opinion">OPINIÓN:</label>
                    <textarea id="opinion" rows="4" style="width: 100%; border-radius: 5px; border: 1px solid #ccc; padding: 10px;"></textarea>
                    <button class="btn-primary" type="button">ENVIAR</button>
                </div>            
            </div>
        `;
    } catch (error) {
        console.error("Error al cargar el producto:", error);
    }
});
