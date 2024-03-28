window.addEventListener("load", () => {
  // Capturamos el formulario
  
  let nombre = document.querySelector("#nombre");
  let apellido = document.querySelector("#apellido");
  let email = document.querySelector("#email");
  let direccion = document.querySelector("#dir");
  let telefono = document.querySelector("#telefono");
  let contrasenia = document.querySelector("#contrasenia");
  let confirmar = document.querySelector("#confirmar");
  let foto = document.querySelector("#foto");
  

  // Función para mostrar y ocultar un mensaje de ayuda debajo del campo
  function mostrarAyuda(elementoAyuda) {
    elementoAyuda.style.display = "block";
  }
  function ocultarAyuda(elementoAyuda) {
    elementoAyuda.style.display = "none";
  }

//VALIDACIONES ON-TIME

 //Aplicando interacción a los campos del formulario con  blur, change, keyup
 
  nombre.addEventListener("blur", () => {
    validarNombreApellido(nombre);    
  });

  apellido.addEventListener("blur", () => {    
    validarNombreApellido(apellido);   
  });
  
  email.addEventListener("blur", () => {    
    validarEmail(email);
  });
  
  direccion.addEventListener("blur", () => {   
    validarCampo(direccion);    
  });
  
  telefono.addEventListener("blur", () => {   
    validarCampo(telefono);    
  });
  
  contrasenia.addEventListener("keyup", () => {    
      validarContrasenia(contrasenia);
  });
  
  confirmar.addEventListener("keyup", () => {    
      validarConfirmar(confirmar, contrasenia);    
  });
  
  foto.addEventListener("change", () => {
      validarFoto(foto);    
  });
 

  //Función mostrar y ocultar error

  function mostrarError(elementoError) {
    elementoError.style.display = "block";
  }
  function ocultarError(elementoError) {
    elementoError.style.display = "none";
  }


// funciones de validación Nombre y Apellido
  function validarNombreApellido(campo) {     
    if (campo.value.trim() === "" || campo.value.length < 2) { 
      ocultarAyuda(campo.nextElementSibling);     
      mostrarError(campo.nextElementSibling.nextElementSibling);
      return false;     
    } else {
      ocultarError(campo.nextElementSibling.nextElementSibling);  
      mostrarAyuda(campo.nextElementSibling);
      return true;         
    }
  }

  // Función para validar campos con la misma condición (dirección, teléfono, categoría)
  function validarCampo(campo) {
    if (campo.value.trim() === "") {
      ocultarAyuda(campo.nextElementSibling);     
      mostrarError(campo.nextElementSibling.nextElementSibling);
      return false;     
    } else {
      ocultarError(campo.nextElementSibling.nextElementSibling);  
      mostrarAyuda(campo.nextElementSibling);           
      return true;
    }
  }
// Función para validar email
function validarEmail(email) {
  if (!isValidEmail(email.value.trim())) {
    ocultarAyuda(email.nextElementSibling);     
    mostrarError(email.nextElementSibling.nextElementSibling);
    return false;      
  } else {
    ocultarError(email.nextElementSibling.nextElementSibling);  
    mostrarAyuda(email.nextElementSibling);
    return true;           
  }
}
// Función para validar formato email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Función para validar contraseña
function validarContrasenia(contrasenia){   
  if (contrasenia.value && validarContraseniaFormato(contrasenia.value)) {    
    confirmar.disabled = false;
    ocultarError(contrasenia.nextElementSibling.nextElementSibling);  
    mostrarAyuda(contrasenia.nextElementSibling);
    return true;         
  } else {
    ocultarAyuda(contrasenia.nextElementSibling);     
    mostrarError(contrasenia.nextElementSibling.nextElementSibling);  
    return false;
  }  
}
// Función para validar formato contraseña
function validarContraseniaFormato(contrasenia){
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/;
  return passwordRegex.test(contrasenia);
}

function validarConfirmar(confirmar, contrasenia) {  
  if (confirmar.value === contrasenia.value) {
      ocultarError(confirmar.nextElementSibling.nextElementSibling);   
      mostrarAyuda(confirmar.nextElementSibling);
      return true;            
    }else {
      ocultarAyuda(confirmar.nextElementSibling);     
      mostrarError(confirmar.nextElementSibling.nextElementSibling);
      return false;                           
    }
}

function validarExtension(fotoname){
  // Obtengo la extensión del archivo
  const extension = fotoname.split('.').pop().toLowerCase();
  // Extensiones permitidas
  const allowedExtensions = ['.jpg', '.png', '.jpeg', '.gif'];
  // Verifico si la extensión está en la lista de permitidas
  return allowedExtensions.includes(`.${extension}`);
}

function validarFoto(foto){
  let archivo = foto.files[0];  
  ocultarError(foto.nextElementSibling.nextElementSibling);  
  mostrarAyuda(foto.nextElementSibling);  
  if (!foto){
    return true;
  }
  if(archivo && !validarExtension(foto.value)){  
  ocultarAyuda(foto.nextElementSibling);     
  mostrarError(foto.nextElementSibling.nextElementSibling);
  return false;
  }
  ocultarError(foto.nextElementSibling.nextElementSibling);  
  mostrarAyuda(foto.nextElementSibling);
  return true;    
}


//VALIDACIONES CON SUBMIT
let formRegistro = document.querySelector("#formRegistro");

formRegistro.addEventListener("submit", (event) => {
  event.preventDefault(); // Evito que el formulario se envíe automáticamente
  
  // Llamo a las funciones de validación
  let nombreValido = validarNombreApellido(nombre);
  let apellidoValido = validarNombreApellido(apellido);
  let emailValido = validarEmail(email);
  let direccionValida = validarCampo(direccion);
  let telefonoValido = validarCampo(telefono);
  let contraseniaValida = validarContrasenia(contrasenia);
  let confirmarValido = validarConfirmar(confirmar, contrasenia);
  let fotoValida = validarFoto(foto);
 

  // Validaciones exitosas (true)
  if (nombreValido && apellidoValido && emailValido && direccionValida && telefonoValido && contraseniaValida && confirmarValido && fotoValida) {
      // Pasan los datos al servidor
      alert("¡Bienvenido a Huellitas Santiago!");
      formRegistro.submit();
  } else {
      alert("Complete correctamente el formulario.");
  }
});
})







