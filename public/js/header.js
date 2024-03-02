window.onload = function(){
    let burgerImg = document.querySelector('.burger-menu');

    burgerImg.addEventListener('click', function(){
        document.querySelector('#menu').classList.toggle('mostrar');
    });

    document.querySelector('#iconClose').addEventListener('click', function(){
        document.querySelector('#menu').classList.remove('mostrar')
    }); 
}
