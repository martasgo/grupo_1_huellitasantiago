function mostrarOpciones() {
    var select1 = document.getElementById("categoria");
    var opcionesDiv = document.getElementById("subCatSelect");
    var opcionesDivPrentacion = document.getElementById("alimentoPresentacion");
    var opcionesDivAccesorios = document.getElementById("subCatAccesorios");
    var select2 = document.getElementById("subCat");
    
    opcionesDiv.style.display = (select1.value == "1") ? "block" : "none";
    opcionesDivPrentacion.style.display = (select1.value == "1") ? "block" : "none";
    opcionesDivAccesorios.style.display = (select1.value == "2") ? "block" : "none";
  }