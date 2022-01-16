import { Usuario } from "./usuario.js";
import { validateField } from "./utils.js";

const usuario = new Usuario();

const form = document.getElementById("form-signup");
const nombres = document.getElementById("nombres");
const apellidos = document.getElementById("apellidos");
const password = document.getElementById("password");
const email = document.getElementById("email");
const repeatPassword = document.getElementById("repeatPassword");

nombres.addEventListener("keyup", () => {
  const flgElement = nombres.validity.valid;
  validateField(flgElement, "field-nombres");
});

apellidos.addEventListener("keyup", () => {
  const flgElement = apellidos.validity.valid;
  validateField(flgElement, "field-apellidos");
});

email.addEventListener("keyup", () => {
  console.log(email.validity);
  const flgElement = email.validity.valid;
  validateField(flgElement, "field-email", 'Ingrese un correo válido');
});

password.addEventListener("keyup", () => {
  if (password.validity.valid) {
    const elementPassword =
      document.getElementsByClassName("field-password")[0].lastElementChild;
    if (password.value.length < 5) {
      elementPassword.innerText = "La constraseña debe ser más de 5 carácteres";
    } else {
      elementPassword.innerText = "";
    }
  }
});

repeatPassword.addEventListener("change", () => {
  const elementPassword = document.getElementsByClassName(
    "field-repeatPassword"
  )[0].lastElementChild;

  if (password.value != repeatPassword.value) {
    elementPassword.innerText = "La contraseña no es la misma";
  } else {
    elementPassword.innerText = "";
  }
});

form.addEventListener("submit", () => {
  const nuevoUsuario = {
    nombres: form.elements["nombres"].value,
    apellidos: form.elements["apellidos"].value,
    email: form.elements["email"].value,
    password: form.elements["password"].value,
    repeatPassword: form.elements["repeatPassword"].value,
  };

  usuario.createUser(nuevoUsuario);
});
