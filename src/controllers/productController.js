const prodController = {
    indexProductController: (req, res) => {
      /* res.render('../views/cart/index.ejs', {
        title: '' 
      });*/
    },
    detailProductController:(req, res) => {
        idProducto = parseInt(req.params.id);
        if (idProducto === 1 ){
            res.render('../views/products/dispenser-azimut.ejs', {
                title: '' 
            });
        }
    },
};
  
module.exports = prodController;