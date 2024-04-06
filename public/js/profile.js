window.addEventListener("load", () => {
    // Obtenemos la URL actual
    let url = window.location.href;

    // Encontramos la posición del último signo igual en la URL
    let lastIndex = url.lastIndexOf('=');
    if (lastIndex){
        let mensaje = url.substring(lastIndex + 1);
        if (mensaje === 'procesado'){
            alert('El producto fue dado de baja correctamente')
        } 
     } 
    })