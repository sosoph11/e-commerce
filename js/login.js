//Verificar si esta autenticado 
document.addEventListener('DOMContentLoaded', function() {
  if (localStorage.getItem('isAuthenticated') !== 'true' && window.location.pathname !== '/login.html') {
      window.location.href = 'login.html';
  }
});

// Función que se ejecuta al hacer clic en el botón "Ingresar"
function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Validar que los campos no estén vacíos
    if (username.trim() === '' || password.trim() === '') {
      showAlertError('Por favor, completa todos los campos.');
      return;
    }
   //Guarda la sesión si la autenticación es exitosa 
    localStorage.setItem('isAuthenticated', 'true');

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
  
  // Event listener para el botón "Ingresar"
  document.getElementById('login-button').addEventListener('click', handleLogin);
