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