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

    // referencio todos los checkbox
    const checkboxes = document.querySelectorAll('.marca-checkbox');
    const edadboxes = document.querySelectorAll('.edad-checkbox');
    const sizeboxes = document.querySelectorAll('.size-checkbox');

    // Obtener el elemento <section> donde mostrar los filtros
    const sectionFilters = document.getElementById('filterList');

    let precioDesde = document.querySelector('#precioDesde');
    let precioHasta = document.querySelector('#precioHasta');
    let limpiar = document.querySelector('#btnlimpiar');
    let filtrar = document.querySelector('#btnfiltrar');

    //LIMPIAR FILTROS
    limpiar.addEventListener('click', function(e){
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
            localStorage.removeItem(checkbox.id);
        })
        edadboxes.forEach(age => {
            age.checked = false;
            localStorage.removeItem(age.id);
        })
        sizeboxes.forEach(size => {
            size.checked = false;
            localStorage.removeItem(size.id);
        })
        precioDesde.value='',
        localStorage.removeItem(precioDesde.id);
        precioDesde.value=''
        localStorage.removeItem(precioHasta.id);
        sectionFilters.textContent = '';
    })

    // EVENTO AL HACER CLICK EN FILTRAR
    filtrar.addEventListener('click', function(e){
        if(precioDesde.value > precioHasta.value) {
            e.preventDefault()
            alert('El valor del precio en el campo Desde debe ser menor al valor del campo Hasta')
        }
        if(precioHasta.value < precioDesde.value) {
            e.preventDefault()
            alert('El valor del precio en el campo Hasta debe ser mayor al valor del campo Desde')
        }
    })

    precioDesde.addEventListener('change', function() {
        if (precioDesde.value!=='') {
            localStorage.setItem(precioDesde.id, 'true');
            const descripcion = 'Desde:' + precioDesde.value;
            sectionFilters.textContent =  sectionFilters.textContent + descripcion+', ';
        } else {
            // Limpiar la descripción cuando el checkbox está deseleccionado
            localStorage.removeItem(precioDesde.id);
            window.location.reload();
        }
    });
    // Verificar si el si se habia cargado un valor de precio antes
    if (localStorage.getItem(precioDesde.id) === 'true') {
        const descripcion = 'Desde:' + precioDesde.value;
        sectionFilters.textContent =  sectionFilters.textContent + descripcion+', ';
    }  


    precioHasta.addEventListener('change', function() {
        if (precioHasta.value!=='') {
            localStorage.setItem(precioHasta.id, 'true');
            const descripcion = 'Hasta:' + precioHasta.value;
            sectionFilters.textContent =  sectionFilters.textContent + descripcion+', ';
        } else {
            // Limpiar la descripción cuando el checkbox está deseleccionado
            localStorage.removeItem(precioHasta.id);
            window.location.reload();
        }
    });
    // Verificar si el si se habia cargado un valor de precio antes
    if (localStorage.getItem(precioHasta.id) === 'true') {
        const descripcion = 'Desde:' + precioHasta.value;
        sectionFilters.textContent =  sectionFilters.textContent + descripcion+', ';
    }  

    // escucha a cada checkbox de marca
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                // Mostrar la descripción correspondiente cuando el checkbox está seleccionado
                localStorage.setItem(this.id, 'true');
                const descripcion = this.getAttribute('id');
                sectionFilters.textContent =  sectionFilters.textContent + descripcion+', ';
            } else {
                // Limpiar la descripción cuando el checkbox está deseleccionado
                localStorage.removeItem(this.id);
                window.location.reload();
            } 
            });
        // Verificar si el checkbox estaba seleccionado previamente
        if (localStorage.getItem(checkbox.id) === 'true') {
            checkbox.checked = true;
            const descripcion = checkbox.getAttribute('id');
            sectionFilters.textContent =  sectionFilters.textContent + descripcion+', ';
        }   
    });

    // checkbox de edad
    edadboxes.forEach(agebox => {
        agebox.addEventListener('change', function() {
            if (this.checked) {
                // Mostrar la descripción correspondiente cuando el checkbox está seleccionado
                localStorage.setItem(this.id, 'true');
                const descripcion = this.getAttribute('id');
                sectionFilters.textContent =  sectionFilters.textContent + descripcion+', ';
            } else {
                // Limpiar la descripción cuando el checkbox está deseleccionado
                localStorage.removeItem(this.id);
                window.location.reload();
            } 
            });
        // Verificar si el checkbox estaba seleccionado previamente
        if (localStorage.getItem(agebox.id) === 'true') {
            agebox.checked = true;
            const descripcion = agebox.getAttribute('id');
            sectionFilters.textContent =  sectionFilters.textContent + descripcion+', ';
        }   
    });

    //checkbox size
    sizeboxes.forEach(size => {
        size.addEventListener('change', function() {
            if (this.checked) {
                // Mostrar la descripción correspondiente cuando el checkbox está seleccionado
                localStorage.setItem(this.id, 'true');
                const descripcion = this.getAttribute('id');
                sectionFilters.textContent =  sectionFilters.textContent + descripcion+', ';
            } else {
                // Limpiar la descripción cuando el checkbox está deseleccionado
                localStorage.removeItem(this.id);
                window.location.reload();
            } 
            });
        // Verificar si el checkbox estaba seleccionado previamente
        if (localStorage.getItem(size.id) === 'true') {
            size.checked = true;
            const descripcion = size.getAttribute('id');
            sectionFilters.textContent =  sectionFilters.textContent + descripcion+', ';
        }   
    });
}