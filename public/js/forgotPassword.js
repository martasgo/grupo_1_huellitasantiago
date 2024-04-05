window.addEventListener("load", function () {
  const formForgotPass = document.getElementById("formForgotPass");   
  const emailInput = document.getElementById("emailPass");   
  
    // Agregar evento de input a los campos de email 
    emailInput.addEventListener("blur", function () {
      if (emailInput.value == "") {
        document.querySelector("#error-emailPass").innerText =
          "El campo email no puede quedar vacio";
      } else {
        validarEmail(this.value);
      }
    });
    
    function validarEmail(email) {
      // Expresión regular para validar el formato del correo electrónico
      var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (regex.test(email)) {      
        document.querySelector("#error-emailPass").innerText = "";
        return true;
      } else {      
        document.querySelector("#error-emailPass").innerText =
          "El email debe ser en un formato valido";
          return false;
      }
    }

    formForgotPass.addEventListener("submit", (event) => {
      event.preventDefault(); // Evito que el formulario se envíe automáticamente
      
      // Funciones de validación
      if (emailInput.value == "") {
        document.querySelector("#error-emailPass").innerText =
          "El campo email no puede quedar vacio";
      } else {        
         emailValido = validarEmail(emailInput.value);  
      }    
               
      // Validaciones exitosas (true)
      if (emailValido) {
          // Pasan los datos al servidor
          formForgotPass.submit();      
      } else {
          alert("Complete correctamente el formulario.");
      }
    });  
  });
  