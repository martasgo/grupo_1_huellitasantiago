
const cartController = {
    indexCartController: (req, res) => {
      res.render('../views/cart/index.ejs', {
        title: 'Carrito de Compra'
      });
    } 
};
  
module.exports = cartController;
  