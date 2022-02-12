export const validateField = (flgState, input, msg) => {
  const element = document.getElementsByClassName(input)[0].lastElementChild;

  if (!flgState && !msg) {
    element.innerHTML = "El campo es obligatorio";
  } else if (!flgState && msg) {
    element.innerHTML = msg;
  } else {
    element.innerHTML = "";
  }
}


export const messageToast = (mensaje, tipo) => {
  const toastMensaje = document.getElementById('toast');
  toastMensaje.classList.remove('hide');
  toastMensaje.classList.add('show');
  toastMensaje.innerText = mensaje;
  setTimeout(() => {
    toastMensaje.classList.add('hide');
    toastMensaje.classList.remove('show');
  }, 6000)


}

export const logueado = (isLogueado) => {

  const itemUnirme = document.getElementById('nav-unirme');
  const itemSalir = document.getElementById('nav-salir');

  itemUnirme.classList.add('noMostrar');
  itemSalir.classList.add('noMostrar');

  if (isLogueado === 'true') {
    itemSalir.classList.remove('noMostrar');
  } else {
    itemUnirme.classList.remove('noMostrar');
  }
}

