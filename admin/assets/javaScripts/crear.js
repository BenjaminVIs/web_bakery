document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Capturar datos del formulario
        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo1").value;
        const telefono = document.getElementById("telefono").value || "No indicado";
        const region = document.getElementById("region").value;
        const comuna = document.getElementById("comuna").value;

        // Crear objeto usuario
        const nuevoUsuario = { nombre, correo, telefono, region, comuna };

        // Obtener usuarios existentes en localStorage
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Agregar nuevo usuario
        usuarios.push(nuevoUsuario);

        // Guardar en localStorage
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        // Redirigir al listado
        window.location.href = "user.html";
    });
});
