
const cartController = {
    indexCartController: (req, res) => {
      res.render('../views/cart/index.ejs', {
        title: 'Carrito de Compra'
      });
    },
    checkoutCartController: (req, res) => {
      res.render('../views/cart/checkout.ejs', {
        title: 'Iniciar Compra'
      });
    },   
};
  
module.exports = cartController;
  