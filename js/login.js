import { Usuario } from "./usuario.js";
import { logueado, validateField } from "./utils.js";

const usuario = new Usuario();
const URLactual = window.location;

if (URLactual.pathname === "/pages/login.html") {
  const isLogueado = localStorage.getItem('isLogueado');
  logueado(isLogueado);
  salirDeSesion();
  añadirEventosCampos();
  añadirEventoBotonAcceder();
}

//Evento de validación al Email
function añadirEventosCampos() {
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  email.addEventListener("keyup", () => {
    const flgElement = email.validity.valid;
    validateField(flgElement, "field-email", "Ingrese un correo válido");
  });

  //Evento de validación al Password
  password.addEventListener("keyup", () => {
    validateField(true, "field-password");
  });
}

function añadirEventoBotonAcceder() {
  const btnAcceder = document.getElementById("btnAcceder");

  btnAcceder.addEventListener("click", () => {
    const fieldPassword = document.getElementById("field-password");

    //Validaciones de inputs
    if (!email.value) {
      validateField(false, "field-email");
    }
    if (!password.value) {
      validateField(false, "field-password");
      return;
    }

    //Validando al usuario
    const userValidado = usuario.validateUser(email.value, password.value);

    //Luego de validar, saber que accion tomar
    if (userValidado) {
      window.location.href = "/index.html";
      localStorage.setItem('isLogueado', true);

    } else {
      //Muestra el mensaje de error luego de validar
      const msgError = document.createElement("small");
      msgError.setAttribute("id", "msgError");
      msgError.innerText = "Verifique el correo o contraseña sea el correcto";
      fieldPassword.appendChild(msgError);
    }
  });
}

export function salirDeSesion() {
  const salir = document.getElementById('nav-salir');

  salir.addEventListener('click', () => {
    localStorage.setItem('isLogueado', false);
    logueado(false);
  });
}