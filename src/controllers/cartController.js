
const cartController = {
    indexCartController: (req, res) => {
      res.render('../views/cart/index.ejs', {
        title: ''
      });
    }
};
  
module.exports = cartController;
  