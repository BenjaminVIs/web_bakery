fetch('assets/data/productos.json')
  .then(res => res.json())
  .then(productos => {
    // leer el id de la URL
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));
    const producto = productos.find(p => p.id === id);

    if(producto){
      document.getElementById("imagenPrincipal").src = producto.imagen;
      document.getElementById("nombreProducto").textContent = producto.nombre;
      document.getElementById("precio").textContent = `$${producto.precio.toLocaleString()}`;
      document.getElementById("descripcion").textContent = producto.descripcion;

      // evento agregar al carrito
      document.getElementById("addCart").addEventListener("click", () => {
        const cantidad = parseInt(document.getElementById("cantidad").value);

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existente = cart.find(p => p.id === producto.id);
        if (existente) {
          existente.cantidad += cantidad;
        } else {
          cart.push({...producto, cantidad: cantidad});
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        // Redirigir al carrito
        window.location.href = "carrito.html";
      });

    } else {
      document.querySelector("main").innerHTML = "<h2>Producto no encontrado</h2>";
    }
  })
  .catch(err => console.error('Error cargando JSON:', err));