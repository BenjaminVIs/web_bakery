// ==================== VALIDACIONES ====================

// Validar correo permitido
function validarCorreo(correo) {
  const regex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
  return regex.test(correo) && correo.length <= 100;
}

// Validar contraseña (4 a 10 caracteres)
function validarPassword(pass) {
  return pass.length >= 4 && pass.length <= 10;
}

// ==================== REGISTRO ====================
document.addEventListener("DOMContentLoaded", () => {
  const registroForm = document.getElementById("registroForm");
  const loginForm = document.getElementById("loginForm");

  // -------- Registro de usuario --------
  if (registroForm) {
    registroForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Evita recargar la página

      const nombre = document.getElementById("nombre").value.trim();
      const correo1 = document.getElementById("correo1").value.trim();
      const correo2 = document.getElementById("correo2").value.trim();
      const pass = document.getElementById("password").value.trim();
      const confirmPass = document.getElementById("confirm-password").value.trim();
      const telefono = document.getElementById("telefono").value.trim();
      const region = document.getElementById("region").value;
      const comuna = document.getElementById("comuna").value;

      // Validaciones
      if (nombre === "" || nombre.length > 100) {
        alert("Nombre requerido (máx. 100 caracteres).");
        return;
      }

      if (!validarCorreo(correo1)) {
        alert("Correo inválido. Solo se permiten @duoc.cl, @profesor.duoc.cl y @gmail.com.");
        return;
      }

      if (correo1 !== correo2) {
        alert("Los correos no coinciden.");
        return;
      }

      if (!validarPassword(pass)) {
        alert("La contraseña debe tener entre 4 y 10 caracteres.");
        return;
      }

      if (pass !== confirmPass) {
        alert("Las contraseñas no coinciden.");
        return;
      }

      if (region === "" || comuna === "") {
        alert("Debes seleccionar una región y una comuna.");
        return;
      }

      // Guardar en localStorage
      const usuario = {
        nombre,
        correo: correo1,
        password: pass,
        telefono,
        region,
        comuna
      };

      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      
      // Verificar si el correo ya está registrado
      const existe = usuarios.find(u => u.correo === correo1);
      if (existe) {
        alert("Este correo ya está registrado.");
        return;
      }

      usuarios.push(usuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      alert("Usuario registrado correctamente ✅");

      registroForm.reset();

      // Redirigir al home
      window.location.href = "index.html";
    });
  }

  // -------- Inicio de sesión --------
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const correo = document.getElementById("correo").value.trim();
      const pass = document.getElementById("password").value.trim();

      if (!validarCorreo(correo)) {
        alert("Correo inválido.");
        return;
      }

      if (!validarPassword(pass)) {
        alert("La contraseña debe tener entre 4 y 10 caracteres.");
        return;
      }

      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      const usuario = usuarios.find(u => u.correo === correo && u.password === pass);

      if (usuario) {
        alert(`Inicio de sesión exitoso ✅\nBienvenido, ${usuario.nombre}`);
        window.location.href = "index.html"; // lo lleva al home si inicia bien
      } else {
        alert("Usuario o contraseña incorrectos ❌");
      }
    });
  }
});
