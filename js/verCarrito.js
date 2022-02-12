import { Carrito } from './carrito.js';
import { salirDeSesion } from './login.js';
import { getCupones } from './services.js';
import { logueado, messageToast } from './utils.js';

const carrito = new Carrito();

function listarCarrito(resultado) {
    let listaCarrito = document.getElementById('lista-carrito');
    const tablaCarrito = document.getElementById('tabla-carrito');

    if (listaCarrito) {
        listaCarrito.remove();
        listaCarrito = document.createElement('tbody');
        listaCarrito.setAttribute('id', 'lista-carrito');
        tablaCarrito.appendChild(listaCarrito);
    }


    resultado = carrito.findAllItems();
    for (const item of resultado) {
        const itemDiv = document.createElement('tr');
        const precioTotal = item.precio * item.cantidad;
        itemDiv.innerHTML = `
                               <td><img src="../assets/images/${item.image}" style="width: 100px;" alt="${item.nombre}"/></td>
                               <td>${item.nombre}</td>
                               <td>${item.category}</td>
                               <td><input type="number" class="fy-control-number" value="${item.cantidad}" id="cantidad${item.id}" data-id="${item.id}" min="1" max="100"></td>
                               <td id="precio${item.id}">$ ${item.precio}</td>
                               <td id="precioTotal${item.id}">$ ${precioTotal}</td>
                               <td><a class="btn btn-fancyPrimary" id="btnDeleteItem${item.id}" data-id="${item.id}">X</a></td>
                             `;

        listaCarrito.appendChild(itemDiv);

        const btnAddCarrito = document.getElementById(`btnDeleteItem${item.id}`);
        const valueCantidad = document.getElementById(`cantidad${item.id}`);
        const valuePrecio = document.getElementById(`precio${item.id}`);
        const valuePrecioTotal = document.getElementById(`precioTotal${item.id}`);
        const idItem = document.querySelector(`#btnDeleteItem${item.id}`);
        añadirEventoDelete(btnAddCarrito, idItem);
        añadirEventoCantidad(valueCantidad, valuePrecio, valuePrecioTotal);
    }
}

function listarSubtotales(listaCarrito) {
    let containerSubtotal = document.getElementById('carrito__subtotal');
    containerSubtotal.innerHTML = '';
    listaCarrito = carrito.findAllItems();

    let total = 0;
    for (const item of listaCarrito) {
        const divSubtotales = document.createElement('div');
        divSubtotales.setAttribute('class', 'carrito__subtotal');
        const precioTotal = item.precio * item.cantidad;

        total = total + precioTotal

        divSubtotales.innerHTML = `
                                        <span> ${item.nombre} </span>
                                        <span> $ ${precioTotal} </span>
                                  `;

        containerSubtotal.appendChild(divSubtotales);
    }

    mostrarTotal(total);
}

let totalFinal = 0;

function mostrarTotal(cantidad, cupon) {
    const total = document.getElementById('total');
    if (cupon) {
        total.innerText = `$ ${cantidad - cupon}`;
        totalFinal = cantidad - cupon;
    } else {
        total.innerText = `$ ${cantidad}`;
        totalFinal = cantidad;
    }

    return totalFinal
}

function construirPedido() {
    const btnCheckout = document.getElementById('btnCheckout');
    const listaCarrito = carrito.findAllItems();
    const tipoEntrega = localStorage.getItem('tipoEntrega');

    const pedido = {
        pedido: listaCarrito,
        tipoEntrega: tipoEntrega,
        totalFinal: totalFinal
    }

    localStorage.setItem('pedido', JSON.stringify(pedido));
    btnCheckout.addEventListener('click', () => {
        window.location.href = "/pages/checkout.html";
    })
}

function añadirEventoDelete(btnAddCarrito, idItem) {
    const idSeleccionado = idItem.dataset.id;

    btnAddCarrito.addEventListener(('click'), () => {
        carrito.deleteItem(idSeleccionado);
        listarCarrito();
        listarSubtotales();
    });
}

function añadirEventoCantidad(cantidad, valuePrecio, valuePrecioTotal) {

    cantidad.addEventListener(('keyup', 'change'), () => {
        const idItem = cantidad.dataset.id; //ID de elemento
        let itemEncontrado = carrito.findOneByIdItem(+idItem);
        const index = carrito.lista.indexOf(itemEncontrado);

        itemEncontrado.cantidad = +cantidad.value; //Reemplazar valor de cantidad por el actual
        carrito.lista.splice(index, 1, itemEncontrado); //Quitando item de array y reemplazar por el modificado
        localStorage.setItem("carrito", JSON.stringify(carrito.lista)); //Actualizado en el localstorage

        let valuePrecioFinal = valuePrecio.innerHTML;

        valuePrecioFinal = +valuePrecioFinal.replace('$', '').trim(); //Actualizando el precio

        let nuevoValorPrecioFinal = (valuePrecioFinal * itemEncontrado.cantidad);
        valuePrecioTotal.innerHTML = `$ ${nuevoValorPrecioFinal}`;

        listarSubtotales();

    });
}


function añadirEventoRadios(selector, rdbSeleccionado) {
    let rdbTipoEntrega = document.getElementsByName(selector);
    for (let i = 0; i < rdbTipoEntrega.length; i++) {
        const radio = rdbTipoEntrega[i];

        radio.addEventListener('change', () => {
            rdbSeleccionado = radio.value;
            localStorage.setItem("tipoEntrega", rdbSeleccionado);

        });

        if (radio.checked) {
            rdbSeleccionado = radio.value;
            localStorage.setItem("tipoEntrega", rdbSeleccionado);
        }
    }
}


function añadirEventoBotonAplicarCupon() {
    const btnAplicarCupon = document.getElementById('btnAplicarCupon');

    btnAplicarCupon.addEventListener('click', async () => {
        const cupon = document.getElementById('cupon');
        if (cupon.value) {
            const cupones = await getCupones();
            const cuponIngresado = cupones.find(e => e.codigo = cupon.value);

            if (cuponIngresado) {
                const total = (document.getElementById('total').innerText).replace('$', '').trim();
                mostrarTotal(+total, cuponIngresado.valor)
                messageToast('El cupon ha sido usado con éxito!');
            }
        }  else {
            messageToast('Ignrese un cupon!');
        }
    });
}


const isLogueado = localStorage.getItem('isLogueado');
logueado(isLogueado);
salirDeSesion();
listarCarrito();
listarSubtotales();
añadirEventoRadios('rdbTipoEntrega');
añadirEventoBotonAplicarCupon();
construirPedido();