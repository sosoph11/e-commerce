document.addEventListener("DOMContentLoaded", () => {
    let profilePic = document.getElementById("profile-pic");
    let navbarProfilePic = document.getElementById("navbar-profile-pic");
    let upload = document.getElementById("upload");
    let saveBtn = document.getElementById("save-btn");
    let resizeBtn = document.getElementById("resize-btn");
    let deleteBtn = document.getElementById("delete-btn");
    let widthInput = document.getElementById("width");
    let heightInput = document.getElementById("height");

    // Cargar la foto de perfil desde localStorage al cargar la página
    let savedPic = localStorage.getItem("profilePic");
    if (savedPic) {
        profilePic.src = savedPic; // Si hay una imagen guardada, la mostramos
        navbarProfilePic.src = savedPic; // Actualiza la foto en la barra de navegación
    }

    // Manejar el evento de subir la imagen
    upload.addEventListener("change", (event) => {
        let file = event.target.files[0]; // Obtenemos el primer archivo del input
        if (file) {
            let reader = new FileReader(); // Creamos un nuevo objeto FileReader
            reader.onloadend = () => {
                profilePic.src = reader.result; // Al finalizar la lectura, cambiamos la imagen
                navbarProfilePic.src = reader.result; // Actualiza la foto en la barra de navegación
            };
            reader.readAsDataURL(file); // Leemos la imagen como una URL
        }
    });
    
    // Manejar el evento de guardar la imagen
    saveBtn.addEventListener("click", () => {
        localStorage.setItem("profilePic", profilePic.src); // Guardamos la imagen en localStorage
        navbarProfilePic.src = profilePic.src; // Actualiza la imagen en la barra de navegación
        alert("Foto de perfil guardada."); // Mensaje de confirmación
    });
        // Ajustar el tamaño de la imagen
        resizeBtn.addEventListener("click", () => {
            let newWidth = parseInt(widthInput.value);
            let newHeight = parseInt(heightInput.value);
    
            if (newWidth > 0 && newHeight > 0) {
                profilePic.style.width = newWidth + 'px';
                profilePic.style.height = newHeight + 'px';
            } else {
                alert("Por favor, ingresa dimensiones válidas.");
            }
        });
       // Eliminar la foto
    deleteBtn.addEventListener("click", () => {
        profilePic.src = 'default-pic.jpg'; // Restablecer a la imagen predeterminada
        navbarProfilePic.src = 'default-pic.jpg'; // Restablecer la imagen en la barra de navegación
        upload.value = ''; // Limpiar el input de archivo
        localStorage.removeItem("profilePic"); // Eliminar imagen de localStorage
    });
});
