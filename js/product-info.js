document.addEventListener('DOMContentLoaded', async function () {
    // Obtener el productID del localStorage
    let productID = localStorage.getItem("productID");
    
    // URL de la API para obtener la información del producto
    let url = `https://japceibal.github.io/emercado-api/products/${productID}.json`;
    
     // URL de la API para obtener los comentarios del producto
    let productsComments = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`

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
        `;
        // Mostrar productos relacionados
        let relatedProductsContainer = document.getElementById("related-products");

        product.relatedProducts.forEach(related => {
            let relatedProductHTML = `
            <div class="col-6 col-md-4">
                <div class="product-card" data-product-id="${related.id}">
                    <img src="${related.image}" alt="${related.name}">
                    <h2>${related.name}</h2>
                </div>
            </div>
            `;
            relatedProductsContainer.innerHTML += relatedProductHTML;
        });

        // Agregar event listeners a los productos relacionados para la redirección
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', function() {
                let selectedProductId = this.getAttribute('data-product-id');
                
                // Guardar el ID del producto seleccionado en el localStorage
                localStorage.setItem("productID", selectedProductId);
                
                // Recargar la página para mostrar el nuevo producto
                window.location.reload();
                
            });
        });
    } catch (error) {
        console.error("Error al cargar el producto:", error);
    }

    // Fetch comentarios de productos
    fetch(productsComments)
    .then(response => response.json())
    .then(data => {
        displayComments(data);
    })
    .catch(error => {
        console.error("Error fetching comments:", error);
    });
    
    // Función para mostrar los comentarios en pantalla
    function displayComments(comments) {
        const commentsList = document.getElementById('comments-list');
        commentsList.innerHTML = ''; // Limpiar la lista antes de agregar nuevos comentarios
    
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
    
            // Generar estrellas en el puntaje
            let stars = '';
        for (let i = 1; i <= comment.score; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
    
            commentElement.innerHTML = `
                <div class="comment-header">
                    <span class="user">${comment.user}</span>
                    <span class="date">${new Date(comment.dateTime).toLocaleDateString()}</span>
                </div>
                <div class="comment-rating">${stars}</div>
                <div class="comment-text">${comment.description}</div>
            `;
    
            commentsList.appendChild(commentElement);
        });
    }
});

// Función para seleccionar un producto y redirigir a su información

function selectProduct(productId) {
    localStorage.setItem("productID", productId);
    window.location.href = 'product-info.html'; 
}