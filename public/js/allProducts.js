
window.addEventListener('load', () => {  
     // Captura de los elementos necesarios de la vista allProducts.ejs
    let main = document.querySelector('main');
    let section = document.querySelector('section');
    let divProduct = document.querySelectorAll('div.product');
    let aElements = document.querySelectorAll('.pagination a');
    let currentPages = document.querySelectorAll('#currentpage');

    // Modificación de los estilos del section
    section.style.padding = '20px';
    section.style.textAlign = 'center';
    section.style.margin = 'auto';

    // Modificación de los estilos de las etiquetas <a>
    for (let x=0 ; x < aElements.length ; x++) {
        aElements[x].style.color = 'black';
        aElements[x].style.textDecoration = 'none';
        aElements[x].addEventListener('mouseover', () => {
            aElements[x].style.color = '#18c1d8ff'
        });
        aElements[x].addEventListener('mouseleave', () => {
            aElements[x].style.color = 'black'
        });
    };

    
    // MÉTODO PARA OBTENER EL INDICE DE LA PÁGINA QUE VIENE EN URL
    // Obtenemos la URL actual
    let url = window.location.href;

    // Encontramos la posición del último signo igual en la URL
    let lastIndex = url.lastIndexOf('=');

    // Obtenemos el índice de la página luego del signo igual
    let pageNumber = url.substring(lastIndex + 1);

    currentPages.forEach(currentPage => {
        if (currentPage.innerText == pageNumber) {
            currentPage.style.color = '#18c1d8ff';
            currentPage.addEventListener('mouseleave', () => {
                currentPage.style.color = '#18c1d8ff'
            })
        }
    })

})