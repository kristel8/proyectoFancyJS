import { Carrito } from "./carrito.js";
import { buscarProductoPorNombre } from "./index.js";
import { salirDeSesion } from "./login.js";
import { Producto } from "./producto.js";
import { logueado, messageToast } from "./utils.js";

const producto = new Producto();
const carrito = new Carrito();

const nodeBtnBuscar = document.getElementById("btnBuscar");
const nodeBuscador = document.getElementById("buscador");

let URLactual = window.location;
if (URLactual.pathname === "/pages/buscar.html") {
  const isLogueado = localStorage.getItem('isLogueado');
  logueado(isLogueado);
  salirDeSesion();
  añadirEventoBuscar(nodeBtnBuscar, nodeBuscador);
  listarBusqueda();
}




function añadirEventoBuscar(btnBuscar, buscador) {
  btnBuscar.addEventListener("click", buscarProductoPorNombre());

  //Añade evento enter en el buscador
  buscador.addEventListener("keyup", (e) => {
    if (e.keyCode == 13) {
      buscarProductoPorNombre();
    }
  });
};


function listarBusqueda(resultadoDeBusqueda) {
  const listaBusqueda = document.getElementById("lista-busqueda");
  const buscador = document.getElementById("buscador");

  buscador.value = localStorage.getItem("valorBuscador");
  resultadoDeBusqueda = JSON.parse(localStorage.getItem("resultadoBusqueda"));

  for (const item of resultadoDeBusqueda) {
    const itemDiv = document.createElement("div");
    item.category = (item.category).toUpperCase();
    itemDiv.classList.add("lista-item");
    itemDiv.innerHTML = ` <img src="../assets/images/${item.image}" class="item" alt="${item.nombre}"/>
                                    <span><b>${item.category}</b></span>
                                    <span>${item.nombre}</span>
                                    <span><b>$${item.precio}</b></span>
                                    <br>
                                    <input type="number" class="fy-control-number" value="1" id="cantidad${item.id}" min="1" max="100">
                                    <br>
                                    <a class="btn btn-fancyPrimary" id="btnAddCarrito${item.id}" data-id="${item.id}">Añadir a carrito</a>
                               `;

    listaBusqueda.appendChild(itemDiv);

    const btnAddCarrito = document.getElementById(`btnAddCarrito${item.id}`);
    const idItem = document.querySelector(`#btnAddCarrito${item.id}`);
    añadirEventoCarrito(btnAddCarrito, idItem);
  }
}


function añadirEventoCarrito(btnAddCarrito, idItem) {
  const idSeleccionado = idItem.dataset.id;

  btnAddCarrito.addEventListener("click", () => {
    const isRepetido = carrito.findOneByIdItem(+idSeleccionado);
    if (isRepetido) {
      messageToast('Este item está en tu carrito!');
      return;
    } else {
      añadirCantidad(idSeleccionado);
      messageToast('Tu item se ha añadido con éxito!');
    }
  });
}

function añadirCantidad(idSeleccionado) {
  const listaDeProductos = producto.productos;

  let itemSeleccionado = listaDeProductos.find((e) => e.id == idSeleccionado);
  const cantidad = document.getElementById(`cantidad${idSeleccionado}`);
  itemSeleccionado.cantidad = cantidad.value;
  carrito.addItem(itemSeleccionado);
}

export { listarBusqueda, añadirEventoCarrito, añadirCantidad };
