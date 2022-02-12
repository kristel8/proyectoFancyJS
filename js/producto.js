import { getProductoService } from './services.js'

export class Producto {
  constructor() {
    this.productos = this.obtenerProducts();
  }

  //Obtiene el servicio de Productos
  async obtenerProducts() {
      this.productos = await getProductoService() || [];
  }

  async createProduct( item ) {
      await postProductoService( item );
  }

  findAllProducts() {
    return this.productos;
  }

  async findOneByIdProduct(id) {
    await this.obtenerProducts();

      if(this.productos.length > 0) {
        const item = this.productos.find((element) => element.id === id);
        return item;
      }
  }

  findProductByCategory(category) {
    return this.productos.filter((element) => element.category == category);
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
