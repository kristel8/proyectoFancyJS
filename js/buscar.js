import { Carrito } from "./carrito.js";
import { eventoBuscar } from "./index.js";
import { Producto } from "./producto.js";

const producto = new Producto();
const carrito = new Carrito();

let URLactual = window.location;
if (URLactual.pathname === "/pages/buscar.html") {
  listarBusqueda();
}

function listarBusqueda(resultadoDeBusqueda) {
  const listaBusqueda = document.getElementById("lista-busqueda");
  resultadoDeBusqueda = JSON.parse(localStorage.getItem("resultadoBusqueda"));
  const buscador = document.getElementById("buscador");
  buscador.value = localStorage.getItem("valorBusqueda");

  for (const item of resultadoDeBusqueda) {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("card");
    itemDiv.setAttribute("style", "width: 18rem; margin: 0.5rem;");
    itemDiv.innerHTML = ` <img src="../assets/images/${item.image}" class="card-img-top" alt="${item.nombre}"/>
                               <div class="card-body">
                                    <h5 class="card-title">${item.nombre}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">${item.category}</h6>
                                    <h5>${item.precio}$</h5>
                                    <input type="number" value="1" id="cantidad${item.id}" min="1" max="100">
                                    <a class="btn btn-fancyPrimary" id="btnAddCarrito${item.id}" data-id="${item.id}">Añadir a carrito</a>
                               </div>`;

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
      return;
    } else {
      añadirCantidad(idSeleccionado);
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

export { añadirEventoCarrito, añadirCantidad };
