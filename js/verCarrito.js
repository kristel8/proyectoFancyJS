import { Carrito } from './carrito.js';
import { Producto } from './producto.js';

const carrito = new Carrito();

function listarCarrito( resultado ) {
    let listaCarrito = document.getElementById('lista-carrito');
    const tablaCarrito = document.getElementById('tabla-carrito');

    if(listaCarrito) {
        listaCarrito.remove();
        listaCarrito = document.createElement('tbody');
        listaCarrito.setAttribute('id', 'lista-carrito');
        tablaCarrito.appendChild(listaCarrito);
    }
    

    resultado = carrito.findAllItems();
    for (const item of resultado) {
         const itemDiv = document.createElement('tr');
         itemDiv.innerHTML = `
                               <td><img src="../assets/images/${item.image}" style="width: 100px;" alt="${item.nombre}"/></td>
                               <td>${item.nombre}</td>
                               <td>${item.category}</td>
                               <td><input type="number" class="fy-control-number" value="${item.cantidad}" id="cantidad${item.id}" data-id="${item.id}" min="1" max="100"></td>
                               <td id="precio${item.id}">${item.precio}</td>
                               <td id="precioTotal${item.id}">${item.precio * item.cantidad}</td>
                               <td><a class="btn btn-fancyPrimary" id="btnDeleteItem${item.id}" data-id="${item.id}">X</a></td>
                             `;

        listaCarrito.appendChild(itemDiv);

        const btnAddCarrito = document.getElementById(`btnDeleteItem${item.id}`);
        const valueCantidad = document.getElementById(`cantidad${item.id}`);
        const valuePrecio = document.getElementById(`precio${item.id}`);
        const valuePrecioTotal = document.getElementById(`precioTotal${item.id}`);
        const idItem = document.querySelector(`#btnDeleteItem${item.id}`);
        añadirEventoDelete(btnAddCarrito, idItem);
        añadirEventoCantidad( valueCantidad, valuePrecio, valuePrecioTotal );
    }

}

function añadirEventoDelete( btnAddCarrito , idItem ) {
    const idSeleccionado = idItem.dataset.id;
    
    btnAddCarrito.addEventListener(('click'), () => {
        carrito.deleteItem(idSeleccionado);
        listarCarrito();

    });
}

function añadirEventoCantidad( cantidad, valuePrecio, valuePrecioTotal) {

    cantidad.addEventListener(('change'), () => {
        const idItem = cantidad.dataset.id; //ID de elemento
        let itemEncontrado = carrito.findOneByIdItem(+idItem);
        const index = carrito.lista.indexOf(itemEncontrado);

        itemEncontrado.cantidad = cantidad.value; //Reemplazar valor de cantidad por el actual
        carrito.lista.splice(index, 1, itemEncontrado); //Quitando item de array y reemplazar por el modificado
        localStorage.setItem("carrito", JSON.stringify(carrito.lista)); //Actualizado en el localstorage

        let valuePrecioFinal = valuePrecio.innerHTML;
        valuePrecioTotal.innerHTML = valuePrecioFinal * cantidad.value; //Actualizando el precio
    });
} 

listarCarrito();