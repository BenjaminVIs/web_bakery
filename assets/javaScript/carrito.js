const cartItemsContainer = document.getElementById("cart-items");
const template = document.getElementById("product-template");
const totalAmount = document.getElementById("total-amount");

// Leer carrito del localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Renderizar el carrito
function renderCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach(product => {
    // Validar que el producto tenga los datos necesarios
    if (!product.nombre || !product.precio || !product.imagen) return;

    const clone = template.content.cloneNode(true);

    // Datos del producto
    clone.querySelector(".product-name").textContent = product.nombre;
    clone.querySelector(".product-price").textContent = `$${product.precio.toLocaleString()}`;
    clone.querySelector(".product-image").src = product.imagen;
    const qtyInput = clone.querySelector(".product-quantity");
    qtyInput.value = product.cantidad;

    // Calcular subtotal
    total += product.precio * product.cantidad;

    // Botones de cantidad
    clone.querySelector(".increase").addEventListener("click", () => {
      product.cantidad++;
      saveCart();
    });

    clone.querySelector(".decrease").addEventListener("click", () => {
      if (product.cantidad > 1) {
        product.cantidad--;
      } else {
        cart = cart.filter(p => p.id !== product.id);
      }
      saveCart();
    });

    qtyInput.addEventListener("change", (e) => {
      let val = parseInt(e.target.value);
      product.cantidad = val > 0 ? val : 1;
      saveCart();
    });

    cartItemsContainer.appendChild(clone);
  });

  totalAmount.textContent = total.toLocaleString();
}

// Guardar y actualizar
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Inicializar renderG CFCFRRFFGV 23
renderCart();