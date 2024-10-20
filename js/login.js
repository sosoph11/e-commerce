// Verificar si está autenticado
document.addEventListener('DOMContentLoaded', function() {
    let isAuthenticated = localStorage.getItem('isAuthenticated'); 
    let currentPage = window.location.pathname.split('/').pop(); 

    // Si no está autenticado y no está en la página de login, redirigir a login.html
    if (isAuthenticated !== 'true' && currentPage !== 'login.html') {
        window.location.href = 'login.html';
    }
    // Obtener el botón de login por su ID
  const loginButton = document.getElementById('login-button');
  
  // Verificar si el botón de login existe
  if (loginButton) {
    // Si existe, agregar un event listener al botón para ejecutar la función handleLogin al hacer clic
    loginButton.addEventListener('click', handleLogin);
  }

  // Obtener el botón de ingreso como invitado por su ID
  const guestButton = document.getElementById('guest-button');
  
  // Verificar si el botón de invitado existe
  if (guestButton) {
    // Si existe, agregar un event listener al botón para ejecutar el siguiente código al hacer clic
    guestButton.addEventListener('click', function() {
      
      // Simular un inicio de sesión como invitado
      const guestUsername = "invitado"; 
      const guestPassword = ""; 

      // Guardar la sesión como invitado en localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', guestUsername);

      // Mostrar un mensaje de "Ingreso como invitado exitoso"
      showAlertSuccess('¡Ingreso como invitado exitoso! Redirigiendo a la página de portada...');
      
      // Redirigir a la página de portada después de 2 segundos
      setTimeout(function() {
        window.location.href = 'index.html';
      }, 2000);
    });
  }
});

// Función que se ejecuta al hacer clic en el botón "Ingresar"
function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Expresión regular para validar un email
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validar que los campos no estén vacíos
    if (username.trim() === '' || password.trim() === '') {
      showAlertError('Por favor, completa todos los campos.');
      return;
    }

    // Validar que el username sea un email válido
    if (!emailRegex.test(username)) {
      showAlertError('Por favor, ingresa un email válido.');
      return;
    }

    // Validar que la contraseña tenga al menos 6 caracteres
    if (password.length < 6) {
      showAlertError('La contraseña debe tener al menos 6 caracteres.');
      return;
  }

   //Guarda la sesión si la autenticación es exitosa 
    localStorage.setItem('isAuthenticated', 'true');

    localStorage.setItem('username', username);

    // Mostrar mensaje de "Ingreso exitoso"
    showAlertSuccess('¡Ingreso exitoso! Redirigiendo a la página de portada...');
  
    // Redirigir a la página de portada después de 2 segundos
    setTimeout(function() {
      window.location.href = 'index.html'; // Redirige a la página de portada 
    }, 2000);
  }
  
  // Función para mostrar una alerta de éxito
  function showAlertSuccess(message) {
    const alertContainer = document.getElementById('alert-container');
    alertContainer.innerHTML = `<div class="alert alert-success">${message}</div>`;
  }
  
  // Función para mostrar una alerta de error
  function showAlertError(message) {
    const alertContainer = document.getElementById('alert-container');
    alertContainer.innerHTML = `<div class="alert alert-danger">${message}</div>`;
  }

