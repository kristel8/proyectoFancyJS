
export class Carrito {
  constructor() {
    this.lista = JSON.parse(localStorage.getItem("carrito")) || [];
  }

  findAllItems() {
    return this.lista;
  }

  addItem(item) {
    this.lista.push(item);
    localStorage.setItem("carrito", JSON.stringify(this.lista));
  }

  findOneByIdItem(itemId) {
    if(this.lista.length > 0) {
      const item = this.lista.find((element) => element.id === itemId);

      // if (!item) {
      //   throw new Error("No existe el item id:" + itemId);
      // }
      return item;
    }
  }

  updateItem(itemId, cantidad) {
    const item = this.findOneByIdItem(itemId);
    const index = this.lista.indexOf(item);
    this.lista[index].cantidad = cantidad;
    if (cantidad <= 0) {
      this.lista[index].stock = false;
    }
  }

  deleteItem(itemId) {
    const item = this.findOneByIdItem(+itemId);
    const index = this.lista.indexOf(item);
    this.lista.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(this.lista));
  }

  calculateItems() {
    let total = 0;
    this.lista.forEach((element) => {
      total += element.precio;
    });

    return total;
  }
}
