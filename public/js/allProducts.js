
window.addEventListener('load', () => {
// Captura de los elementos necesarios de la vista allProducts.ejs

let main = document.querySelector('main');
let section = document.querySelector('section');
let divProduct = document.querySelectorAll('div.product');
let aElements = document.querySelectorAll('.pagination a');

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
    aElements[x].addEventListener('click', () => {
        aElements[x].style.color = '#18c1d8ff'
    });
    aElements[x].addEventListener('mouseleave', () => {
        aElements[x].style.color = 'black'
    });
}
})