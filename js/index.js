import { Producto } from "./producto.js";
import { añadirEventoCarrito } from "./buscar.js";
import { joyasService } from './services.js'

const producto = new Producto();

const btnBuscar = document.getElementById("btnBuscar");
const buscador = document.getElementById("buscador");

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
  //Añade evento al boton buscar
  btnBuscar.addEventListener("click", buscarItem);

  //Añade evento enter en el buscador
  buscador.addEventListener("keyup", (e) => {
    console.log(e);
    if (e.keyCode == 13) {
      buscarItem();
    }
  });
};

const URLactual = window.location;

if (URLactual.pathname === "/index.html" || URLactual.pathname === "/") {
  //Ejecutamos las funciones que se mostrarán a primera vista
  listaJoyas();
  eventoBuscar();

  //Animación de subir scroll
  $('#scroll-top').click(() => {
    $('html, body').animate({
      scrollTop: $("#navigation").offset().top
    });
  });
}

async function listaJoyas() {
  //Validamos si es la página Buscar para no ser ejecutado
  if (URLactual.pathname === "/pages/buscar.html") {
    return;
  }

  //Llamamos el servicio y renderizamos los cards
  const listaItems = document.getElementById("lista-joyas");
  const listaObtenida = await joyasService();
  for (const item of listaObtenida) {

    item.category = (item.category).toUpperCase();
    const itemDiv = document.createElement("div");
    itemDiv.innerHTML = `<div class="lista-item" id="lista-item${item.id}" data-id="${item.id}">
        <div class="item joya${item.id}" id="joya${item.id}"  data-id="${item.id}"></div>
         <span><b>${item.category}</b></span>
        <span>${item.nombre}</span>
        <span><b>S/ ${item.precio}</b></span>
        <br>
        <input type="number" class="fy-control-number" value="1" id="cantidad${item.id}" min="1" max="100">
        <br>
        <a class="btn btn-fancyPrimary" id="btnAddCarrito${item.id}" data-id="${item.id}">Añadir a carrito</a>
        </div>`;

    listaItems.appendChild(itemDiv);

    const itemSeleccionado = document.getElementById(`joya${item.id}`);
    const btnAddCarrito = document.getElementById(`btnAddCarrito${item.id}`);
    const idItem = document.querySelector(`#btnAddCarrito${item.id}`);

    //Añadimos eventos al botón y al card
    añadirEventoCarrito(btnAddCarrito, idItem);
    añadirEventoVerProducto(itemSeleccionado);
  }
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
