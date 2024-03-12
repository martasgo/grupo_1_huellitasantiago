window.addEventListener('load', () => {

    detalleButtons = document.querySelectorAll('#detalle');
    detalleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const compraId = this.getAttribute('data-compra-id');
            const detalleProducto = document.getElementById(`detalle-${compraId}`);
            detalleProducto.classList.toggle('show');
        });
    });
    
})
