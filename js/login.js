import { Usuario } from "./usuario.js";
import { validateField } from "./utils.js";

const usuario = new Usuario();

const email = document.getElementById("email");
const password = document.getElementById("password");
const btnAcceder = document.getElementById("btnAcceder");

email.addEventListener("keyup", () => {
  const flgElement = email.validity.valid;
  validateField(flgElement, "field-email", "Ingrese un correo válido");
});

password.addEventListener("keyup", () => {
  validateField(true, "field-password");
});

btnAcceder.addEventListener("click", () => {
  const fieldPassword = document.getElementById("field-password");

  if (!email.value) {
    validateField(false, "field-email");
  }
  if (!password.value) {
    validateField(false, "field-password");
    return;
  }

  const userValidado = usuario.validateUser(email.value, password.value);

  if (userValidado) {
    window.location.href = "/pages/carrito.html";
  } else {
    if (fieldPassword.lastElementChild.id === "msgError") {
      return;
    }

    const msgError = document.createElement("small");
    msgError.setAttribute("id", "msgError");
    msgError.innerText = "Verifique el correo o contraseña sea el correcto";
    fieldPassword.appendChild(msgError);
  }
});
