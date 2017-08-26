const db = require('./db');
const Sequelize = db.Sequelize;

const Product = db.define('product', {
    name: {
        type: Sequelize.STRING
    }
});

Product.getProducts = () => {
   return Product.findAll({ include: [{ all: true}]})
   .then(products => {
       return products.sort((a,b) => {
           return a.id-b.id;
       });
   });
}

module.exports = Product;
