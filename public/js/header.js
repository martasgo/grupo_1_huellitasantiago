window.addEventListener('load', () => {

    let burgerImg = document.querySelector('.burger-menu');

    burgerImg.addEventListener('click', function(){
        document.querySelector('#menu').classList.toggle('mostrar');
    });

    document.querySelector('#iconClose').addEventListener('click', function(){
        document.querySelector('#menu').classList.remove('mostrar')
    }); 
    
    // MÉTODO PARA OBTENER EL ID DEL PRODUCTO QUE VIENE EN URL
        // Obtenemos la URL actual
        let url = window.location.href;

        // Encontramos la posición de la última barra en la URL
        let lastSlashIndex = url.lastIndexOf('/');

        // Obtenemos el ID del producto después de la última barra
        let productId = url.substring(lastSlashIndex + 1);

    // FUNCIÓN PARA ACTUALIZAR EL TOTAL DE ITEMS DEL CARRITO DEL HEADER
    let cantidadCarrito = document.querySelector('.cantidadcarrito');

    function productosEnElCarrito () {
        let cantidadTotal = 0;
        if (localStorage.carrito) {
            let carrito = JSON.parse(localStorage.carrito);
            carrito.forEach(item => {
                cantidadTotal = Number(cantidadTotal) + parseInt(item.cantidad)
            });
        };
        
        return localStorage.carrito ? cantidadTotal : 0;
    };

    if (localStorage.carrito) {
        cantidadCarrito.innerText = 'Carrito: ' + productosEnElCarrito ();
    };

    // FUNCIÓN PARA VACIAR EL CARRITO
    let linkVaciarCarrito = document.querySelector('.vaciarcarrito');
    function vaciarCarrito () {
        // Elimina todos los elementos <tr> con la clase 'nuevoitem'
        document.querySelectorAll('.nuevoitem').forEach((item) => {
            item.remove();
        });

        // Limpia el carrito en localStorage
        localStorage.removeItem('carrito');

        // Borra la variable 'order' si existe
        if (window.order) {
            delete window.order;
        }

        // Actualiza la cantidad en cantidadcarrito
        cantidadCarrito.innerText = 'Carrito: ' + productosEnElCarrito();

        // Vacía el array de products
        products = [];

        // Actualiza el subtotal descontando el producto eliminado
        document.querySelector('#subtotalfinal').innerText = `${totalCarrito(products)}`;
    };
    
    linkVaciarCarrito.addEventListener('click', (event) => {
        event.preventDefault();
        vaciarCarrito()
    });
    
    // FETCH CON LA API DE PRODUCTOS PARA TRAER UN PRODUCTO POR SU ID

    fetch(`/api/product/${productId}`)
        .then((res) => res.json())
        .then((product) => {
            // Todas las operaciones relacionadas con productCart dentro de este bloque
            let productCart = product;
            console.log(productCart);

            // Capturamos los elementos a utilizar
            let inputCantidad = document.querySelector('#cantidadproducto');
            let botonSumar = document.querySelector('#botonsumar');
            let botonRestar = document.querySelector('#botonrestar');
            let stockActual = productCart.stock; 
            let botonAgregarAlCarrito = document.querySelector('.addtocart');

            // Agregando eventos para el manejo del carrito
            botonSumar.addEventListener('click', (event) => {
                event.preventDefault();
                let cantidadActual = inputCantidad.value;
                if (cantidadActual < stockActual) {
                    inputCantidad.value++;
                } else {
                    alert('La cantidad que deseas seleccionar supera el stock disponible');
                }
            });

            botonRestar.addEventListener('click', (event) => {
                event.preventDefault();
                if (inputCantidad.value > 0) {
                    inputCantidad.value--;
                } else {
                    alert('No puedes seleccionar una cantidad menor a cero');
                }
            });

            botonAgregarAlCarrito.addEventListener('click', (event) => {
                event.preventDefault();
                console.log(inputCantidad.value)

                // Verificar si inputCantidad.value es un string vacío
                if (inputCantidad.value == '') {
                    alert('Por favor, selecciona una cantidad válida.');
                    return; // Detener la ejecución si la cantidad no es válida
                };

                if (localStorage.carrito) {
                    let carrito = JSON.parse(localStorage.carrito);
                    let index = carrito.findIndex( 
                        (prod) => ( prod.id ==  event.target.dataset.id));
                    if (index !== -1) {
                        carrito[index].cantidad = parseInt(carrito[index].cantidad) + parseInt(inputCantidad.value)
                    } else {
                        carrito.push({id:event.target.dataset.id, cantidad:inputCantidad.value})
                    };
                    localStorage.setItem("carrito", JSON.stringify(carrito))
                } else {
                    localStorage.setItem("carrito", JSON.stringify([{id:event.target.dataset.id, cantidad:parseInt(inputCantidad.value)}]))
                }; 
                cantidadCarrito.innerText = 'Carrito: ' + productosEnElCarrito ();
            })
        })
        .catch((error) => {
            console.error('Error al obtener el producto:', error);
        });
    
    // FUNCIÓN PARA OBTENER EL MONTO TOTAL EN $ DEL CARRITO
    function totalCarrito (products) {
        return products.reduce(
            (acum, product) => {
                return (acum += (Number(product.precio * (1 - (product.descuento/100))) * Number(product.cantidad)))
        }, 0)
    };

    // FUNCIÓN PARA OBTENER LA CANTIDAD TOTAL DE ITEMS DEL CARRITO
    function itemsTotales (products) {
        return products.reduce(
            (acum, product) => {
                return (acum += Number(product.cantidad))
        }, 0)
    };

    // FUNCIÓN PARA COMPLETAR EL INDEX (DETALLE) DEL CARRITO
    let tablaCarrito = document.querySelector('.detallecarrito');
    let products = [];
    if (localStorage.carrito) {
        let carrito = JSON.parse(localStorage.carrito);
        carrito.forEach((item, index) => {
            fetch(`/api/product/${item.id}`)
                .then((res) => res.json())
                .then((product) => {
                    if (product) {
                        tablaCarrito.innerHTML += `
                        <tr class="nuevoitem" id='row${index}'>
                            <td><img src="images/productos/${product.imagen}" style="width: 70px; height: 70px;"/></td>
                            <td colspan='3'>${product.nombre}</td>
                            <td>$ ${product.precio}</td>
                            <td>${product.descuento} %</td>
                            <td>${item.cantidad}</td>
                            <td>$ ${parseFloat((product.precio * (1 - (product.descuento/100))) * item.cantidad, 2).toFixed(2)}</td>
                            <td><button class="sumarencarrito" data-id="${product.id}"><i class="fa-solid fa-plus"></i></button> <button class="restarencarrito" data-id="${product.id}"><i class="fa-solid fa-minus"></i></button> <button class="eliminardelcarrito" data-id="${product.id}"><i class="fa-solid fa-trash-can"></i></button></td>
                        </tr>
                        `;
                        // Pusheamos los datos para luego hacer el create en la DB
                        products.push({
                            id_product: product.id,
                            nombre: product.nombre,
                            precio: product.precio,
                            descuento: product.descuento,
                            cantidad: item.cantidad,
                            stock: product.stock
                        })
                    } else {
                        //Si no está el producto lo borro de localStorage
                        carrito.splice(index, 1);
                        localStorage.setItem('carrito', JSON.stringify(carrito))
                    }
                    
                })
                .then( () => {
                    document.querySelector('#subtotalfinal').innerText = `${totalCarrito(products)}`
                }
                )
        });
    };

    // FUNCIÓN PARA MANEJAR EL PROCESO DE "INICIAR COMPRA" - FETCH POST
    let checkoutCart = document.querySelector('#inicio-compra');
    checkoutCart.addEventListener('click', (event) => {
        if (localStorage.getItem('carrito')) {
            // Obtenemos la fecha y hora actuales
            let fechaActual = new Date();
            // Creamos el objeto para mandar por post al método checkout del controller
            let order = {
                cantidad_productos: itemsTotales(products),
                monto_total: totalCarrito(products),
                fecha: fechaActual.toISOString(),
                productos: products 
            };

            // Realizamos la solicitud fetch directamente
            fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            })
            .then((result)=>result.json())
            .then((data) => {
                console.log(data);
                vaciarCarrito();
                let userID = document.querySelector('#userId').value;
                location.href = `/user/compras/${userID}`
            })
            .catch(error => {
                console.error(error);
                alert('Para iniciar la compra, primero debes loguearte');
                location.href = '/user/login'
            });
        } else {
            event.preventDefault();
            alert('No tienes productos en el carrito para iniciar una compra');
        }
    });

    // EVENTO PARA ELIMINAR ON TIME PRODUCTOS DEL INDEX DEL CARRITO
    document.body.addEventListener('click', (event) => {
    const button = event.target.closest('.eliminardelcarrito');

        if (button) {
            // Acciones cuando se hace clic en el botón eliminar del carrito
            const row = button.closest('tr'); // Encuentra el elemento tr más cercano (la fila)

            // Verifica si se encontró la fila
            if (row) {
                // Elimina el producto del carrito en localStorage
                const productId = button.dataset.id;
                if (localStorage.carrito) {
                    let carrito = JSON.parse(localStorage.carrito);
                    const index = carrito.findIndex(item => item.id == productId);
                    if (index !== -1) {
                        // Actualiza la variable 'order' y elimina el producto del carrito
                        products = products.filter(product => product.id_product != productId);
                        carrito.splice(index, 1);
                        localStorage.setItem('carrito', JSON.stringify(carrito));
                        
                        // Actualiza el subtotal descontando el producto eliminado
                        document.querySelector('#subtotalfinal').innerText = `${totalCarrito(products)}`;
                        
                        // Actualiza el texto de la cantidad de carrito
                        cantidadCarrito.innerText = 'Carrito: ' + productosEnElCarrito();
                    }
                }

                // Elimina la fila del DOM
                row.remove();
            }
        }
    });

    // EVENTO PARA AGREGAR ON TIME UNIDADES DE UN PRODUCTO EN EL CARRITO
    document.body.addEventListener('click', (event) => {
        const sumarButton = event.target.closest('.sumarencarrito');
    
        if (sumarButton) {
            // Acciones cuando se hace clic en el botón sumar del carrito
            const productId = sumarButton.dataset.id;
    
            // Encuentra la fila correspondiente al producto
            const row = sumarButton.closest('tr');
    
            if (row) {
                const cantidadElement = row.querySelector('td:nth-child(5)');
                const product = products.find(product => product.id_product == productId);
                if (parseInt(cantidadElement.innerText) < parseInt(product.stock)) {
                    // Incrementa la cantidad en la fila
                    cantidadElement.innerText = parseInt(cantidadElement.innerText) + 1;
        
                    // Actualiza el total de esa fila
                    const totalElement = row.querySelector('td:nth-child(6)');
                    product.cantidad = Number(product.cantidad) + 1;
                    totalElement.innerText = `$ ${parseFloat(Number(product.precio * (1 - (product.descuento/100))) * Number(product.cantidad), 2).toFixed(2)}`;
        
                    // Actualiza el subtotal final
                    document.querySelector('#subtotalfinal').innerText = `${totalCarrito(products)}`;
        
                    // Actualiza la variable order
                    let order = {
                        cantidad_productos: itemsTotales(products),
                        monto_total: totalCarrito(products),
                        productos: products
                    };
        
                    // Actualiza la cantidad de ese producto en localStorage
                    if (localStorage.carrito) {
                        let carrito = JSON.parse(localStorage.carrito);
                        const index = carrito.findIndex(item => item.id == productId);
                        if (index !== -1) {
                            carrito[index].cantidad = parseInt(carrito[index].cantidad) + 1;
                            localStorage.setItem('carrito', JSON.stringify(carrito));
                        }
                    }

                    // Actualiza la cantidad en cantidadcarrito
                    cantidadCarrito.innerText = 'Carrito: ' + productosEnElCarrito();
                } else {
                    alert('La cantidad que intentas seleccionar supera el stock disponible de este producto')
                } 
            }
        }
    });

    // EVENTO PARA RESTAR ON TIME UNIDADES DE UN PRODUCTO EN EL CARRITO
    document.body.addEventListener('click', (event) => {
        const restarButton = event.target.closest('.restarencarrito');

        if (restarButton) {
            // Acciones cuando se hace clic en el botón restar del carrito
            const productId = restarButton.dataset.id;

            // Encuentra la fila correspondiente al producto
            const row = restarButton.closest('tr');

            if (row) {
                // Obtén la cantidad actual en la fila
                const cantidadElement = row.querySelector('td:nth-child(5)');
                let cantidadActual = parseInt(cantidadElement.innerText);

                // Verifica si la cantidad es mayor a 1 antes de restar
                if (cantidadActual > 1) {
                    // Resta la cantidad en la fila
                    cantidadActual--;
                    cantidadElement.innerText = cantidadActual;

                    // Actualiza el total de esa fila
                    const totalElement = row.querySelector('td:nth-child(6)');
                    const product = products.find(product => product.id_product == productId);
                    product.cantidad = Number(product.cantidad) - 1;
                    totalElement.innerText = `$ ${parseFloat(Number(product.precio * (1 - (product.descuento/100))) * Number(product.cantidad), 2).toFixed(2)}`;

                    // Actualiza el subtotal final
                    document.querySelector('#subtotalfinal').innerText = `${totalCarrito(products)}`;

                    // Actualiza la variable order
                    let order = {
                        cantidad_productos: itemsTotales(products),
                        monto_total: totalCarrito(products),
                        productos: products
                    };

                    // Actualiza la cantidad de ese producto en localStorage
                    if (localStorage.carrito) {
                        let carrito = JSON.parse(localStorage.carrito);
                        const index = carrito.findIndex(item => item.id == productId);
                        if (index !== -1) {
                            carrito[index].cantidad = parseInt(carrito[index].cantidad) - 1;
                            localStorage.setItem('carrito', JSON.stringify(carrito));
                        }
                    }

                    // Actualiza la cantidad en cantidadcarrito
                    cantidadCarrito.innerText = 'Carrito: ' + productosEnElCarrito();
                } else {
                    // Muestra un alert si la cantidad es menor a 1
                    alert('No puede seleccionar una cantidad menor a 1. Si desea eliminar el producto, presione el botón de borrar.');
                }
            }
        }
    });

    
});
