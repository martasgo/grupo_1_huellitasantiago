window.onload = function(){
    const formulario = document.getElementById('searchProdMobile');
    const select = document.getElementById('categoryList');

    // Escuchar cambios en el select
    select.addEventListener('change', () => {
        // Obtener el valor seleccionado del select
        const valorSelect = select.value;

        // Completar el action del formulario con el valor seleccionado
        formulario.action = valorSelect;
    });
    
}