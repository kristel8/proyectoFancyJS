const URL_JSON_PRODUCTOS = '../js/data/productos.json'
const URL_JSON_JOYAS = '../js/data/joyas.json'


export async function productoService() {
    const resp = await fetch(URL_JSON_PRODUCTOS);

    if ( !resp.ok ) return console.log('No se pudo realizar la petición');
    return await resp.json();
}

export async function joyasService() {
    const resp = await fetch(URL_JSON_JOYAS);

    if ( !resp.ok ) return console.log('No se pudo realizar la petición');
    return await resp.json();
        
}
