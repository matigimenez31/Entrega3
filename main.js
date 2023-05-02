const productos = [
    { id: "procesador", nombre: "Procesador", precio: 40000 },
    { id: "ram", nombre: "RAM", precio: 36540 },
    { id: "motherboard", nombre: "Motherboard", precio: 25000 },
    { id: "placa-video", nombre: "Placa de Video", precio: 120000 },
    { id: "fuente", nombre: "Fuente", precio: 16400 },
    { id: "disco-duro", nombre: "Disco Duro", precio: 7900 },
    { id: "disco-solido", nombre: "Disco Sólido", precio: 9300 },
    { id: "gabinete", nombre: "Gabinete", precio: 23500 },
];

const carrito = [];

function agregarAlCarrito(idProducto) {
    const producto = productos.find((prod) => prod.id === idProducto);
    const productoEnCarrito = carrito.find((prod) => prod.id === idProducto);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
        productoEnCarrito.subtotal = productoEnCarrito.cantidad * productoEnCarrito.precio;
    } else {
        carrito.push({ ...producto, cantidad: 1, subtotal: producto.precio });
    }
    mostrarCarrito();
}

function mostrarCarrito() {
    const carritoTbody = document.getElementById("carrito-tbody");
    carritoTbody.innerHTML = "";
    carrito.forEach((prod) => {
        const tr = document.createElement("tr");
        const tdNombre = document.createElement("td");
        tdNombre.textContent = prod.nombre;
        const tdCantidad = document.createElement("td");
        tdCantidad.textContent = prod.cantidad;
        const tdSubtotal = document.createElement("td");
        tdSubtotal.textContent = prod.subtotal;
        const tdEliminar = document.createElement("td");
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", () => eliminarDelCarrito(prod.id));
        tdEliminar.appendChild(btnEliminar);
        tr.appendChild(tdNombre);
        tr.appendChild(tdCantidad);
        tr.appendChild(tdSubtotal);
        tr.appendChild(tdEliminar);
        carritoTbody.appendChild(tr);
    });
    const total = calcularTotal();
    const totalElem = document.getElementById("total");
    totalElem.textContent = total;
}

function eliminarDelCarrito(idProducto) {
    const productoEnCarrito = carrito.find((prod) => prod.id === idProducto);
    if (productoEnCarrito) {
        if (productoEnCarrito.cantidad > 1) {
            productoEnCarrito.cantidad--;
            productoEnCarrito.subtotal = productoEnCarrito.cantidad * productoEnCarrito.precio;
        } else {
            const index = carrito.indexOf(productoEnCarrito);
            carrito.splice(index, 1);
        }
    }
    mostrarCarrito();
}

function calcularTotal() {
    let total = 0;
    carrito.forEach((prod) => {
        total += prod.subtotal;
    });
    return total;
}

document.addEventListener("DOMContentLoaded", () => {
    productos.forEach((prod) => {
        const btn = document.getElementById(`${prod.id}-btn`);
        btn.addEventListener("click", () => agregarAlCarrito(prod.id));
    });
    mostrarCarrito();
});