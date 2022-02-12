import { Producto } from "./producto.js";
import { añadirEventoCarrito } from "./buscar.js";
import { getJoyasService } from './services.js'
import { logueado } from "./utils.js";
import { salirDeSesion } from "./login.js";

const producto = new Producto();

const btnBuscar = document.getElementById("btnBuscar");
const buscador = document.getElementById("buscador");

const URLactual = window.location;

if (URLactual.pathname === "/index.html" || URLactual.pathname === "/") {
  //Ejecutamos las funciones que se mostrarán a primera vista
  const isLogueado = localStorage.getItem('isLogueado');
  logueado(isLogueado);
  salirDeSesion();
  listaJoyas();
  listaCategorias();
  añadirEventoBuscar();

  //Animación de subir scroll
  $('#scroll-top').click(() => {
    console.log('first')
    $('html, body').animate({
      scrollTop: $("#navigation").offset().top
    });
  });
}


function buscarProductoPorNombre() {

    const buscadorTexto = document.getElementById("buscador");

    if(buscadorTexto.value == "") return

    const resultadoDeBusqueda = producto.findProductByName(buscadorTexto.value);

    if (resultadoDeBusqueda.length > 0) {

      localStorage.removeItem("valorBuscador");
      localStorage.removeItem("resultadoBusqueda");

      localStorage.setItem("valorBuscador", buscadorTexto.value);
      localStorage.setItem("resultadoBusqueda", JSON.stringify(resultadoDeBusqueda));

      window.location.href = "/pages/buscar.html";
    }

}


function buscarProductoPorCategoria() {
  const categoriaSeleccionada = localStorage.getItem("nombreCategoria");

  if (categoriaSeleccionada) {
    const resultadoDeBusqueda = producto.findProductByCategory(categoriaSeleccionada);
    localStorage.removeItem("resultadoBusqueda");
    localStorage.setItem("resultadoBusqueda", JSON.stringify(resultadoDeBusqueda));
    window.location.href = "/pages/buscar.html";
  }
}


function añadirEventoBuscar() {
  btnBuscar.addEventListener("click", buscarProductoPorNombre);
  //Añade evento enter en el buscador
  buscador.addEventListener("keyup", (e) => {
    if (e.keyCode == 13) {
      buscarProductoPorNombre();
    }
  });
};

//Construimos el HTML de las joyas
async function listaJoyas() {
  //Llamamos el servicio y renderizamos los cards
  const containerJoyas = document.getElementById("lista-joyas");
  const listaDeJoyas = await getJoyasService();

  for (const joya of listaDeJoyas) {

    joya.category = (joya.category).toUpperCase();
    const itemDiv = document.createElement("div");
    itemDiv.innerHTML = `
        <div class="lista-item" id="lista-item${joya.id}" data-id="${joya.id}">
          <div class="item joya${joya.id}" id="joya${joya.id}"  data-id="${joya.id}"></div>
          <span><b>${joya.category}</b></span>
          <span>${joya.nombre}</span>
          <span><b>$ ${joya.precio}</b></span>
          <br>
          <input type="number" class="fy-control-number" value="1" id="cantidad${joya.id}" min="1" max="100">
          <br>
          <a class="btn btn-fancyPrimary" id="btnAddCarrito${joya.id}" data-id="${joya.id}">Añadir a carrito</a>
        </div>`;

    containerJoyas.appendChild(itemDiv);

    const joyaSeleccionado = document.getElementById(`joya${joya.id}`);
    const btnAddCarrito = document.getElementById(`btnAddCarrito${joya.id}`);
    const idAñadirCarrito = document.querySelector(`#btnAddCarrito${joya.id}`);

    //Añadimos eventos al botón y al card
    añadirEventoCarrito(btnAddCarrito, idAñadirCarrito);
    añadirEventoVerProducto(joyaSeleccionado);
  }
}

//Añadimos evento de ver producto al seleccionar item
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

//Listado de categorias
function listaCategorias() {
  const containerCategoria = document.getElementById('lista-categorias');

  let categorias = [
    { id: 1, categoria: 'anillos' },
    { id: 2, categoria: 'abridores' },
    { id: 3, categoria: 'colecciones' },
    { id: 4, categoria: 'collar' },
    { id: 5, categoria: 'dijes' },
    { id: 6, categoria: 'piercings' },
    { id: 7, categoria: 'pulseras' },
    { id: 8, categoria: 'rebajas' }
  ]

  for (let i = 0; i < categorias.length; i++) {

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item', `categoria${i + 1}`);
    itemDiv.setAttribute('id', `${categorias[i].categoria}`);
    itemDiv.setAttribute('data-id', `${categorias[i].categoria}`);
    containerCategoria.appendChild(itemDiv);

    const categoriaSeleccionada = document.querySelector(`#${categorias[i].categoria}`);
    console.log(categoriaSeleccionada);
    añadirEventoCategoria(categoriaSeleccionada);

  }

}

//Añade evento ver items de categoría
function añadirEventoCategoria(categoria) {
  const nombreCategoria = categoria.dataset.id;
  categoria.addEventListener('click', () => {
    localStorage.setItem("nombreCategoria", nombreCategoria);
    localStorage.setItem("valorBuscador", nombreCategoria);
    buscarProductoPorCategoria();
  });
}


export { añadirEventoVerProducto, buscarProductoPorNombre };

