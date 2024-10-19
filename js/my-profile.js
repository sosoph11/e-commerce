document.addEventListener("DOMContentLoaded", () => {
    let profilePic = document.getElementById("profile-pic");
    let navbarProfilePic = document.getElementById("navbar-profile-pic");
    let upload = document.getElementById("upload");
    let saveBtn = document.getElementById("save-btn");
    let resizeBtn = document.getElementById("resize-btn");
    let deleteBtn = document.getElementById("delete-btn");
    let widthInput = document.getElementById("width");
    let heightInput = document.getElementById("height");

         // Verificar si el usuario está logueado
  const authenticatedUser = localStorage.getItem("isAuthenticated");
  let  nuser = localStorage.getItem("username");
  if (!authenticatedUser) {
    window.location.href = "login.html"; // Redirige si no está logueado
    return;
  } else {
  nuser = localStorage.getItem("username");
  }
  console.log (nuser);
  // Prellenar el campo de E-mail
  let username = document.getElementById("username");
  if (username) {
    username.value = nuser;
  }

  // Guardar los datos de perfil
let profileInfo = document.getElementById('profileInfo');
if (profileInfo) {
    profileInfo.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario
        let name = document.getElementById('name').value;
        let middleName = document.getElementById('middleName').value;
        let surname = document.getElementById('surname').value;
        let secondSurname = document.getElementById('secondSurname').value;
        let username = document.getElementById('username').value;
        let contactNumber = document.getElementById('contactNumber').value;
        if (!name || !surname || !username) { //Datos obligatorios
            alert('Por favor completa los campos obligatorios.');
            return;
            } else {
                localStorage.setItem('profileInfo', JSON.stringify({ name, middleName, surname, secondSurname, username, contactNumber}))
            }
        })}

     // Cargar datos del perfil
     loadProfileInfo();

    // Manejar envío del formulario
   profileInfo.addEventListener('submit', function(e) {
    e.preventDefault();
    if (profileInfo.checkValidity()) { //Verifica que los datos ingrsados cumplen con los requisitos
        saveProfileInfo();
        alert('Perfil actualizado con éxito');
    } else {
        profileInfo.reportValidity();
    }
});


            // Funciones auxiliares
            function loadProfileInfo() { //Recupera información guardada 
                let profileInfo = JSON.parse(localStorage.getItem('profileInfo')) || {};
                for (const [key, value] of Object.entries(profileInfo)) {
                    if (document.getElementById(key)) {
                        document.getElementById(key).value = value;
                    }
                }
                document.getElementById('username').value = localStorage.getItem('username') || '';
            }

            function saveProfileInfo() { //Crea un objeto "profileInfo" para guardar los datos ingresados en él
                 profileInfo = {
                    name: document.getElementById('name').value, //Obtiene el valir del input con ID name
                    middleName: document.getElementById('middleName').value,
                    surname: document.getElementById('surname').value,
                    secondSurname: document.getElementById('secondSurname').value,
                    username: document.getElementById(username),
                    contactNumber: document.getElementById('contactNumber').value,
                };
                localStorage.setItem('profileInfo', JSON.stringify(profileInfo)); //Convierte el objeto en una cadena JSON para guardarla en el LocalStorage
                localStorage.setItem('username', document.getElementById('username').value); // Guarda el valor del input username para futuras sesiones.
            }

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
       // Eliminar la foto
    deleteBtn.addEventListener("click", () => {
        profilePic.src = 'default-pic.jpg'; // Restablecer a la imagen predeterminada
        navbarProfilePic.src = 'default-pic.jpg'; // Restablecer la imagen en la barra de navegación
        upload.value = ''; // Limpiar el input de archivo
        localStorage.removeItem("profilePic"); // Eliminar imagen de localStorage
    });
});
