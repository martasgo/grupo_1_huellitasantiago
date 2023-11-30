const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// rutas a /
let routerMain = require("./routers/mainRoute");
let routerCart = require("./routers/cartRoute");
let routerUser = require("./routers/userRoute");
let routerProduct = require("./routers/productRoute");

app.use('/', routerMain);
app.use('/cart', routerCart);
app.use('/user', routerUser);
app.use('/product', routerProduct);

// levantamos servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto: http://localhost:${PORT}`);
  });