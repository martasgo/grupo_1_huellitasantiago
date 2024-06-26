window.addEventListener("load", function () {
  const formulario = document.getElementById("formulario-login");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("contrasenia");

  // Agregar evento de input a los campos de email y contraseña para validación en tiempo real
  emailInput.addEventListener("blur", function () {
    if (emailInput.value == "") {
      document.querySelector("#error-email").innerText =
        "El campo email no puede quedar vacio";
    } else {
      validarEmail(this.value);
    }
  });
  
  function validarEmail(email) {
    // Expresión regular para validar el formato del correo electrónico
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (regex.test(email)) {      
      document.querySelector("#error-email").innerText = "";
    } else {      
      document.querySelector("#error-email").innerText =
        "El email debe ser en un formato valido";
    }
  }

  passwordInput.addEventListener("blur", function () {
    if (passwordInput.value == "") {
      document.querySelector("#error-contrasenia").innerText =
        "El campo contraseña no puede quedar vacio";
    } else {
      document.querySelector("#error-contrasenia").innerText = ""
    }
  });
});
