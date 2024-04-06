window.addEventListener("load", () => {
    // Obtenemos la URL actual
    let url = window.location.href;

    // Encontramos la posición del último signo igual en la URL
    let lastIndex = url.lastIndexOf('=');
    if (lastIndex){
        let mensaje = url.substring(lastIndex + 1);
        if (mensaje === 'procesado'){
            alert('El producto fue procesado correctamente')
        } 
     } 
   
    // Capturamos el formulario
    let form = document.querySelector("#form-alta-prod");
  
    // Capturamos los div de subcategorias y presentacion
    let divSubCatAlimentos = document.querySelector("#subCatSelect");
    let divSubCatAccesorios = document.querySelector("#subCatAccesorios");
    let divPresentacion = document.querySelector("#alimentoPresentacion");
  
    // Agregamos eventos para validar categoria on time
  
    form.categoria.addEventListener("change", () => {
      if (parseInt(form.categoria.value) == 1) {
        divSubCatAlimentos.style.display = "block";
        divPresentacion.style.display = "block";
        divSubCatAccesorios.style.display = "none";
      } else if (parseInt(form.categoria.value) == 2) {
        divSubCatAccesorios.style.display = "block";
        divSubCatAlimentos.style.display = "none";
        divPresentacion.style.display = "none";
      } else {        
        divSubCatAlimentos.style.display = "none";
        divPresentacion.style.display = "none";
        divSubCatAccesorios.style.display = "none";
      }
    });
  
    // Verificamos el value de categoria luego de cada submit con errores:
    if (parseInt(form.categoria.value) == 1) {
      divSubCatAlimentos.style.display = "block";
      divPresentacion.style.display = "block";
      divSubCatAccesorios.style.display = "none";
    } else if (parseInt(form.categoria.value) == 2) {
      divSubCatAccesorios.style.display = "block";
      divSubCatAlimentos.style.display = "none";
      divPresentacion.style.display = "none";
    } else {      
      divSubCatAlimentos.style.display = "none";
      divPresentacion.style.display = "none";
      divSubCatAccesorios.style.display = "none";
    }
    
    /* validations */
    function validarCampo(input, mensajeError, minLength = null) {
        if (input.value === "") {
            if (minLength === 0){
                document.querySelector(mensajeError).innerText = "El campo descuento no puede quedar vacío, debe ingresar 0 si no tiene descuento.";
            } else {
                document.querySelector(mensajeError).innerText = "Este campo no puede quedar vacío.";
            }
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
            return false;
        } else if (minLength !== null && input.value.length < minLength) {
            document.querySelector(mensajeError).innerText = `Este campo debe tener al menos ${minLength} caracteres.`;
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
            return false;
        } else {
            document.querySelector(mensajeError).innerText = "";
            input.classList.add("is-valid");
            input.classList.remove("is-invalid");
            return true;
        }
    }

    form.mascota.addEventListener("blur", () => {
        validarCampo(form.mascota, "#msjErrorMascota");
    });
    
    form.nombreprod.addEventListener("blur", () => {
        validarCampo(form.nombreprod, "#msjErrorNombre", 5);
    });
    
    form.precio.addEventListener("blur", () => {
        validarCampo(form.precio, "#msjErrorPrecio");
    });
    
    form.descuento.addEventListener("blur", () => {
        validarCampo(form.descuento, "#msjErrorDesc", 0);
    });
       
    form.categoria.addEventListener("blur", () => {
        validarCampo(form.categoria, "#msjErrorCat");
    });

    form.subCat.addEventListener("blur", () => {
        validarCampo(form.subCat, "#msjErrorSubCat");
    });
    
    form.presentacion.addEventListener("blur", () => {
        validarCampo(form.presentacion, "#msjErrorPackage");
    });
  
    form.subCatAcc.addEventListener("blur", () => {
        validarCampo(form.subCatAcc, "#msjErrorSubCatAcc");
    });
    
    form.marca.addEventListener("blur", () => {
        validarCampo(form.marca, "#msjErrorMarca");
    });

    form.edadmascota.addEventListener("blur", () => {
        validarCampo(form.edadmascota, "#msjErrorAge");
    });
    
    form.tamaniomascota.addEventListener("blur", () => {
        validarCampo(form.tamaniomascota, "#msjErrorSize");
    });

    form.descripcion.addEventListener("blur", () => {
        validarCampo(form.descripcion, "#msjErrorDescripcion", 20);
    });
    
    form.stock.addEventListener("blur", () => {
        validarCampo(form.stock, "#msjErrorStock");
    });

    /* campo IMAGEN*/
    form.foto.addEventListener("blur", () => {
    let archivo = form.foto.files[0];
    if (form.newImage && form.newImage.value !== '' && archivo) {
        var extension = archivo.name.split(".").pop().toLowerCase();
        if (!["jpg", "jpeg", "png", "gif"].includes(extension)) {
            document.querySelector("#msjErrorImg").innerText =
            "El formato del archivo no es válido. Por favor seleccione una imagen en formato JPG, JPEG, PNG o GIF.";
            form.foto.classList.remove("is-valid");
            form.foto.classList.add("is-invalid");
        } else {
            form.foto.classList.remove("is-invalid");
            form.foto.classList.add("is-valid");
        }
    // Validar que se haya seleccionado un archivo
    } else if (!form.newImage && !archivo) {
        document.querySelector("#msjErrorImg").innerText = "El campo imagen no puede quedar vacío.";
        form.foto.classList.remove("is-valid");
        form.foto.classList.add("is-invalid");
        return;
    } else if (archivo){
        // Obtener la extensión del archivo
        var extension = archivo.name.split(".").pop().toLowerCase();
        // Validar la extensión del archivo
        if (!["jpg", "jpeg", "png", "gif"].includes(extension)) {
        document.querySelector("#msjErrorImg").innerText =
            "El formato del archivo no es válido. Por favor seleccione una imagen en formato JPG, JPEG, PNG o GIF.";
            form.foto.classList.remove("is-valid");
            form.foto.classList.add("is-invalid");
        return;
        } else {
        document.querySelector("#msjErrorImg").innerText = "";
        form.foto.classList.add("is-valid");
        form.foto.classList.remove("is-invalid");
        }
    }
    });

    /* SUBMIT BUTTON */

    form.addEventListener("submit", function(e) {
        e.preventDefault(); // Prevenir el envío del formulario por defecto
    
        let errores = [];
    
        function validarIngreso(input, mensajeError, minLength = null) {
            if (input.value === "") {
                errores.push(mensajeError);
                input.classList.remove("is-valid");
                input.classList.add("is-invalid");
                return false;
            } else if (minLength !== null && input.value.length < minLength) {
                if (minLength === 5) {
                    errores.push(`El campo nombre del producto debe tener al menos ${minLength} caracteres.`);
                }
                
                if (minLength === 20) {
                    errores.push(`El campo descripción debe tener al menos ${minLength} caracteres.`);
                }

                input.classList.remove("is-valid");
                input.classList.add("is-invalid");
                return false;
            } else {
                input.classList.remove("is-invalid");
                input.classList.add("is-valid");
                return true;
            }
        }
    
        // Validar cada campo
        validarIngreso(form.mascota, "El campo mascota no puede quedar vacío.");
        validarIngreso(form.nombreprod, "El campo nombre no puede quedar vacío.", 5);
        validarIngreso(form.precio, "El campo precio no puede quedar vacío.");
        validarIngreso(form.descuento, "El campo descuento no puede quedar vacío, debe ingresar 0 si no tiene descuento.");
        validarIngreso(form.categoria, "El campo categoría no puede quedar vacío.");
        if (parseInt(form.categoria.value) == 1) {
            validarIngreso(form.subCat, "El campo subcategoría de alimentos no puede quedar vacío.");
            validarIngreso(form.presentacion, "El campo presentación no puede quedar vacío.");
        } else if (parseInt(form.categoria.value) == 2){
            validarIngreso(form.subCatAcc, "El campo subcategoría de accesorios no puede quedar vacío.");
        }
        validarIngreso(form.marca, "El campo marca no puede quedar vacío.");
        validarIngreso(form.edadmascota, "El campo edad mascota no puede quedar vacío.");
        validarIngreso(form.tamaniomascota, "El campo tamaño mascota no puede quedar vacío.");
        validarIngreso(form.descripcion, "El campo descripción no puede quedar vacío.", 20);
        validarIngreso(form.stock, "El campo stock no puede quedar vacío.");
    
        // Validar campo de imagen
        let archivo = form.foto.files[0];     
        if (form.newImage && form.newImage.value !== '' && archivo) {
            var extension = archivo.name.split(".").pop().toLowerCase();
            if (!["jpg", "jpeg", "png", "gif"].includes(extension)) {
                errores.push("El formato de archivo no es válido. Por favor seleccione una imagen en formato JPG, JPEG, PNG o GIF.");
                form.foto.classList.remove("is-valid");
                form.foto.classList.add("is-invalid");
            } else {
                form.foto.classList.remove("is-invalid");
                form.foto.classList.add("is-valid");
            }
        } else if (!form.newImage && !archivo) {
            errores.push("El campo imagen no puede quedar vacío.");
            form.foto.classList.remove("is-valid");
            form.foto.classList.add("is-invalid");
        } else if (archivo){
            var extension = archivo.name.split(".").pop().toLowerCase();
            if (!["jpg", "jpeg", "png", "gif"].includes(extension)) {
                errores.push("El formato de archivo no es válido. Por favor seleccione una imagen en formato JPG, JPEG, PNG o GIF.");
                form.foto.classList.remove("is-valid");
                form.foto.classList.add("is-invalid");
            } else {
                form.foto.classList.remove("is-invalid");
                form.foto.classList.add("is-valid");
            }
        }
    
        // Mostrar errores si los hay
        if (errores.length > 0) {
            let ulErrores = document.querySelector(".errores-front ul");
            ulErrores.innerHTML = '';
            for (let i = 0; i < errores.length; i++) {
                ulErrores.innerHTML += "<li>" + errores[i] + "</li>";
                ulErrores.classList.add("alert-warning");
            }
        } else {
            form.submit(); // Si no hay errores, enviar el formulario
        }
    });
    /* FIN SUBMIT */

})