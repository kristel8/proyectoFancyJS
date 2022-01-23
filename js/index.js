import { Producto } from "./producto.js";
import { Carrito } from "./carrito.js";
import { añadirCantidad, añadirEventoCarrito } from "./buscar.js";
import { productos, joyas, usuarios } from "./data/data.js";
import { productoService, joyasService } from './services.js'

const producto = new Producto();
const carrito = new Carrito();

const btnBuscar = document.getElementById("btnBuscar");
const buscador = document.getElementById("buscador");

function add() {
  localStorage.setItem("productos", JSON.stringify(productos));
  localStorage.setItem("joyas", JSON.stringify(joyas));
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

add();

function buscarItem() {
  if (!buscador.value) return;

  const resultadoDeBusqueda = producto.findProductByName(buscador.value);

  if (resultadoDeBusqueda.length > 0) {
    localStorage.removeItem("resultadoBusqueda");
    localStorage.setItem("valorBuscador", buscador.value);
    localStorage.setItem(
      "resultadoBusqueda",
      JSON.stringify(resultadoDeBusqueda)
    );

    window.location.href = "/pages/buscar.html";
  } else {
    const containerBuscar = document.getElementsByClassName("buscador");
  }
}

export const eventoBuscar = () => {
  btnBuscar.addEventListener("click", buscarItem);

  buscador.addEventListener("keyup", (e) => {
    if (e.keyCode == 13) {
      buscarItem();
    }
  });
};

async function listaJoyas() {
  let URLactual = window.location;
  if (URLactual.pathname === "/pages/buscar.html") {
    return;
  }

  const listaItems = document.getElementById("lista-joyas");
  const listaObtenida = await joyasService();
  for (const item of listaObtenida) {
    const itemDiv = document.createElement("div");
    itemDiv.innerHTML = `<div class="lista-item" id="lista-item${item.id}" data-id="${item.id}">
        <div class="item joya${item.id}"></div>
         <span>${item.category}</span>
        <span>${item.nombre}</span>
        <span><b>S/ ${item.precio}</b></span>
        <br>
        <input type="number" class="fy-control-number" value="1" id="cantidad${item.id}" min="1" max="100">
        <br>
        <a class="btn btn-fancyPrimary" id="btnAddCarrito${item.id}" data-id="${item.id}">Añadir a carrito</a>
        </div>`;

    listaItems.appendChild(itemDiv);

    const itemSeleccionado = document.getElementById(`lista-item${item.id}`);
    const btnAddCarrito = document.getElementById(`btnAddCarrito${item.id}`);
    const idItem = document.querySelector(`#btnAddCarrito${item.id}`);
    añadirEventoCarrito(btnAddCarrito, idItem);
    añadirEventoVerProducto(itemSeleccionado);
  }
}

let URLactual = window.location;
if (URLactual.pathname === "/index.html") {
  listaJoyas();
  eventoBuscar();

  $('#scroll-top').click(() => {
    $('html, body').animate({
      scrollTop: $("#navigation").offset().top
    });
  });

}

function añadirEventoVerProducto(itemSeleccionado) {
  if (URLactual.pathname === "/pages/verProducto.html") {
    return;
  } else {
    itemSeleccionado.addEventListener("click", () => {
      localStorage.setItem('productoSeleccionado', itemSeleccionado.dataset.id);
      window.location.href = "/pages/verProducto.html";
    });
  }
}


  export { añadirEventoVerProducto };
