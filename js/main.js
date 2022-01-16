import { Carrito } from "./carrito.js";
import { Producto } from "./producto.js";
import { productos } from "../data/data.js";

const producto = new Producto(productos);
const carrito = new Carrito([]);

let acceso = true;



function selecionarProductos( opcion ) {
  while (acceso) {
    opcion = prompt(`Agrega un producto al carrito eligiendo un número:
                           \n 1|Pulsera Dior| $100
                           \n 2|Collar Dior| $300
                           \n 3|Aretes Dior| $200
                           \n 4|Reloj Dior| $500
                           \n 5|Anillos Dior| $400
                           \n 6|Comprar
                           \n 7|Salir`);

    opcion = parseInt(opcion);

    switch (opcion) {
      case 1:
        carrito.addItem(producto.findOneByIdProduct(opcion));
        break;

      case 2:
        carrito.addItem(producto.findOneByIdProduct(opcion));
        break;

      case 3:
        carrito.addItem(producto.findOneByIdProduct(opcion));
        break;

      case 4:
        carrito.addItem(producto.findOneByIdProduct(opcion));
        break;

      case 5:
        carrito.addItem(producto.findOneByIdProduct(opcion));
        break;

      case 6:
        let total = carrito.calculateItems();
        alert(
          "Tu carrito tiene un total de:" +
          total
        );
        acceso = false;
        break;

      default:
        alert("Su carrito ha sido cancelado!");
        acceso = false;
        break;
    }
  }
}

selecionarProductos();
