const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;
app.use(express.static('public'));

// ruta a /
app.get('/', function(req, res){
    res.sendFile(path.resolve('./views/home.html'));
});

// ruta para registro
app.get('/register', function(req, res){
    res.sendFile(path.resolve('./views/register.html'));
});

// ruta para login
app.get('/login', function(req, res){
    res.sendFile(path.resolve('./views/login.html'));
});

// ruta para menu de usuario
app.get('/menu-usuario', function(req, res){
    res.sendFile(path.resolve('./views/menu-usuario.html'));
});

// ruta para carrito de compras
app.get('/cart', function(req, res){
    res.sendFile(path.resolve('./views/cart.html'));
});

// ruta para detalle producto (dispenser-azimut)
app.get('/dispenser-azimut', function(req, res){
    res.sendFile(path.resolve('./views/dispenser-azimut.html'));
});

app.listen(PORT, () => console.log(`Levantando servidor en puerto ${PORT}`));