const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

// Función para ordenar las categorías
function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === ORDER_DESC_BY_NAME) {
        result = array.sort((a, b) => b.name.localeCompare(a.name));
    } else if (criteria === ORDER_BY_PROD_COUNT) {
        result = array.sort((a, b) => parseInt(b.productCount) - parseInt(a.productCount));
    }
    return result;
}

// Función para mostrar la lista de categorías
function showCategoriesList(categories = currentCategoriesArray) {
    let htmlContentToAppend = "";
    for(let category of categories) {
        if (((minCount == undefined) || (minCount != undefined && parseInt(category.productCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.productCount) <= maxCount))) {
            
            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action cursor-active" onclick="setCatID(${category.id})">
                <div class="row">
                    <div class="col-3">
                        <img src="${category.imgSrc}" alt="${category.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${category.name}</h4>
                            <small class="text-muted">${category.productCount} artículos</small>
                        </div>
                        <p class="mb-1">${category.description}</p>
                    </div>
                </div>
            </div>`;
        }
    }
    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}

// Función para ordenar y mostrar categorías
function sortAndShowCategories(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined) {
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);
    showCategoriesList();
}

// Código que se ejecuta al cargar el documento
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(CATEGORIES_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            currentCategoriesArray = resultObj.data;
            showCategoriesList(); // Mostrar categorías inicialmente
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function() {
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function() {
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function() {
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function() {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function() {
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        } else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        } else {
            maxCount = undefined;
        }

        showCategoriesList();
    });

    // Event listener para el campo de búsqueda
    document.getElementById("searchInput").addEventListener("input", function() {
        const searchText = this.value.toLowerCase();
        const filteredCategories = currentCategoriesArray.filter(category => {
            return category.name.toLowerCase().includes(searchText) || category.description.toLowerCase().includes(searchText);
        });
        // Mostrar solo las categorías que coincidan con la búsqueda
        showCategoriesList(filteredCategories);
    });
});

// Función para redirigir a la página de productos
function setCatID(id) {
    localStorage.setItem("catID", id); // Almacena el ID de la categoría en localStorage
    window.location = "products.html"; // Redirige a la página de productos
}