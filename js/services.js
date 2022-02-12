const URL_JSON_PRODUCTOS = '../js/data/productos.json'
const URL_JSON_JOYAS = '../js/data/joyas.json'
const URL_JSON_CUPONES = '../js/data/cupones.json'



export async function getProductoService() {
    const resp = await fetch(URL_JSON_PRODUCTOS);

    if (!resp.ok) return console.log('No se pudo realizar la petición');
    return await resp.json();
}

export async function postProductoService(item) {
    const formData = new FormData(item);

    const resp = await fetch(URL_JSON_PRODUCTOS, {
        method: 'PUT',
        body: formData
    });

    if (!resp.ok) return console.log('No se pudo realizar la petición');
    return await resp.json();
}

export async function getJoyasService() {
    const resp = await fetch(URL_JSON_JOYAS);

    if (!resp.ok) return console.log('No se pudo realizar la petición');
    return await resp.json();
}

export async function getCupones() {
    const resp = await fetch(URL_JSON_CUPONES);
    if (!resp.ok) return console.log('No se pudo realizar la petición');
    return await resp.json();
}


