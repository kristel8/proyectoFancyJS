import { Producto } from "../js/producto.js";
import { salirDeSesion } from "./login.js";
import { logueado } from "./utils.js";

const idProducto = localStorage.getItem("productoSeleccionado");

const producto = new Producto();
const productoItem = await producto.findOneByIdProduct(+idProducto);
const isLogueado = localStorage.getItem('isLogueado');
logueado(isLogueado);
salirDeSesion();

$(".producto").append(
  `

    <div class="card mb-3" style="width: 50%; margin: auto;">
        <img src="../assets/images/${productoItem.image}" class="card-img-top" style="width: 100%; height: 500px;" alt="${productoItem.nombre}">
        <div class="card-body">
            <h5 class="card-title">${productoItem.nombre}</h5>
            <h5 class="card-title">$${productoItem.precio}</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p class="card-text"><small class="text-muted">${productoItem.category}</small></p>
        </div>
    </div>
    `
);
