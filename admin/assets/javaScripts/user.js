document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.querySelector("tbody");

    // Obtener usuarios desde localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Insertar en la tabla
    usuarios.forEach(usuario => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${usuario.nombre}</td>
            <td>${usuario.correo}</td>
            <td>${usuario.telefono}</td>
            <td>${usuario.region}</td>
            <td>${usuario.comuna}</td>
        `;

        tbody.appendChild(fila);
    });
});
