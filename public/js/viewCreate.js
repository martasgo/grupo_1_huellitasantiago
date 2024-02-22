window.addEventListener('load', () => {
  // Capturamos los elementos para trabajar con el form y sus campos

  // Capturamos el formulario
  let form = document.querySelector('#form-alta-prod');

  // Capturamos los div de subcategorias y presentacion
  let divSubCatAlimentos = document.querySelector('#subCatSelect');
  let divSubCatAccesorios = document.querySelector('#subCatAccesorios');
  let divPresentacion = document.querySelector('#alimentoPresentacion');

  // Agregamos eventos para validar categoria on time

  form.categoria.addEventListener('change', () => {
    if (parseInt(form.categoria.value) == 1) {
      divSubCatAlimentos.style.display = 'block';
      divPresentacion.style.display = 'block'
      divSubCatAccesorios.style.display = 'none'
    } else if (parseInt(form.categoria.value) == 2) {
      divSubCatAccesorios.style.display = 'block'
      divSubCatAlimentos.style.display = 'none';
      divPresentacion.style.display = 'none'
    } else {
      console.log('no hay categoria aun');
      divSubCatAlimentos.style.display = 'none';
      divPresentacion.style.display = 'none';
      divSubCatAccesorios.style.display = 'none'
    }
  });
  
  // Verificamos el value de categoria luego de cada submit con errores:
    
  if (parseInt(form.categoria.value) == 1) {
    divSubCatAlimentos.style.display = 'block';
    divPresentacion.style.display = 'block'
    divSubCatAccesorios.style.display = 'none'
  } else if (parseInt(form.categoria.value) == 2) {
    divSubCatAccesorios.style.display = 'block'
    divSubCatAlimentos.style.display = 'none';
    divPresentacion.style.display = 'none'
  } else {
    console.log('no hay categoria aun');
    divSubCatAlimentos.style.display = 'none';
    divPresentacion.style.display = 'none';
    divSubCatAccesorios.style.display = 'none'
  }

});


