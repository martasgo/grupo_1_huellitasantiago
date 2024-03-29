window.addEventListener('load', () => {
// Capturamos el button de ELIMINAR
let deleteButton = document.querySelector('button.delete');
let aDeleteElement = document.querySelector('a.delete');

// Agregamos mensaje de confirmación de borrado de producto

deleteButton.addEventListener('click', (event) => {
    if (confirm('¿Está seguro de eliminar este producto?')) {
        alert('Producto eliminado');
    } else {
        event.preventDefault(); // Evita la redirección por defecto
    }
});

})