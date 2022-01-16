export class Producto {
  constructor() {
    this.productos = JSON.parse(localStorage.getItem('productos')) || [];
  }

  createProduct( item ) {
    this.productos.push( item )
    localStorage.setItem( 'productos', JSON.stringify( this.productos ) );
  }

  findAllProducts() {
    return this.productos;
  }

  findOneByIdProduct(id) {
    if(this.productos.length > 0) {
      const item = this.productos.find((element) => element.id === id);
      return item;
    }
  }

  findProductByCategory(category) {
    return this.productos.filter((element) => element.category === category);
  }

  findProductByName(nombre) {
    const item = this.productos.filter((element) => (element.nombre.toLowerCase()).includes(nombre));

    if (!item) {
      throw new Error("No existe el producto:" + itemId);
    }
    return item;
  }

  findProductByCategory(category) {
    return this.productos.filter((element) => element.category === category);
  }

  filterByRangePrice(priceMin, priceMax) {
    return this.productos.filter(
      (element) => element.precio >= priceMin && element.precio <= priceMax
    );
  }
}
