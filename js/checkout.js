import { messageToast, validateField } from "./utils.js";

const detalleEnvio = document.getElementById('detalleEnvio');
const isEnvio = localStorage.getItem('tipoEntrega');
const isLogueado = localStorage.getItem('isLogueado');
logueado(isLogueado);
salirDeSesion();

mostrarDatosEnvio();

function mostrarDatosEnvio() {

    if (isEnvio == 'tienda') {
        detalleEnvio.classList.add('noMostrar');
        añadirEventosCampos();
    } else {
        detalleEnvio.classList.add('mostrar');
        añadirEventosCampos();
        añadirEventosCamposEnvio();
    }
}

function añadirEventosCampos() {
    const nombres = document.getElementById("nombres");
    const apellidos = document.getElementById("apellidos");
    const dni = document.getElementById("dni");
    const pais = document.getElementById("pais");
    const telefono = document.getElementById("telefono");
    const correo = document.getElementById("correo");

    nombres.addEventListener("keyup", () => {
        const flgElement = nombres.validity.valid;
        validateField(flgElement, "field-nombres");
    });

    apellidos.addEventListener("keyup", () => {
        const flgElement = apellidos.validity.valid;
        validateField(flgElement, "field-apellidos");
    });

    dni.addEventListener("keyup", () => {
        const flgElement = dni.validity.valid;
        if (flgElement) {
            const element =
                document.getElementsByClassName("field-dni")[0].lastElementChild;
            if (dni.value.length < 8) {
                element.innerText = "El DNI debe tener 8 carácteres";
            } else {
                element.innerText = "";
            }
        }
    });

    pais.addEventListener("keyup", () => {
        const flgElement = pais.validity.valid;
        validateField(flgElement, "field-pais");
    });

    telefono.addEventListener("keyup", () => {
        const flgElement = telefono.validity.valid;
        if (flgElement) {
            const element =
                document.getElementsByClassName("field-telefono")[0].lastElementChild;
            if (telefono.value.length < 8) {
                element.innerText = "El telefono debe tener 9 carácteres";
            } else {
                element.innerText = "";
            }
        }
    });

    correo.addEventListener("keyup", () => {
        const flgElement = correo.validity.valid;
        validateField(flgElement, "field-correo", 'Ingrese un correo válido');
    });
}


function añadirEventosCamposEnvio() {
    const direccion = document.getElementById("direccion");
    const referencia = document.getElementById("referencia");
    const provincia = document.getElementById("provincia");
    const ciudad = document.getElementById("ciudad");
    const codigoPostal = document.getElementById("codigoPostal");

    direccion.setAttribute('required', '');
    referencia.setAttribute('required', '');
    provincia.setAttribute('required', '');
    ciudad.setAttribute('required', '');
    codigoPostal.setAttribute('required', '');

    direccion.addEventListener("keyup", () => {
        const flgElement = direccion.validity.valid;
        validateField(flgElement, "field-direccion");
    });

    referencia.addEventListener("keyup", () => {
        const flgElement = referencia.validity.valid;
        validateField(flgElement, "field-referencia");
    });

    provincia.addEventListener("keyup", () => {
        const flgElement = provincia.validity.valid;
        validateField(flgElement, "field-provincia");
    });

    ciudad.addEventListener("keyup", () => {
        const flgElement = ciudad.validity.valid;
        validateField(flgElement, "field-ciudad");
    });

    codigoPostal.addEventListener("keyup", () => {
        const flgElement = codigoPostal.validity.valid;
        validateField(flgElement, "field-codigoPostal");
    });

}

function añadirEventoBotonHacerPedido() {
    const form = document.getElementById("form-checkout");
    form.addEventListener("submit", () => {
        let infoPedido;
        if (isEnvio == 'tienda') {
            infoPedido = {
                nombres: form.elements["nombres"].value,
                apellidos: form.elements["apellidos"].value,
                dni: form.elements["dni"].value,
                pais: form.elements["pais"].value,
                telefono: form.elements["telefono"].value,
                correo: form.elements["correo"].value,
            };
        } else {
            infoPedido = {
                nombres: form.elements["nombres"].value,
                apellidos: form.elements["apellidos"].value,
                dni: form.elements["dni"].value,
                pais: form.elements["pais"].value,
                telefono: form.elements["telefono"].value,
                correo: form.elements["correo"].value,
                direccion: form.elements["direccion"].value,
                referencia: form.elements["referencia"].value,
                provincia: form.elements["provincia"].value,
                ciudad: form.elements["ciudad"].value,
                codigoPostal: form.elements["codigoPostal"].value,
            };
        }
        const pedido = JSON.parse(localStorage.getItem('pedido'));

        pedido.detallesEntrega = infoPedido;
        localStorage.setItem('pedido', JSON.stringify(pedido));
        messageToast('El pedido se ha enviado con exito!')
        window.location.href = "/index.html";
    });
}

añadirEventoBotonHacerPedido();
