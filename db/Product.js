const db = require('./db');
const Sequelize = db.Sequelize;

const Product = db.define('product', {
    name: {
        type: Sequelize.STRING
    }
});

Product.getProducts = () => {
   return Product.findAll({ include: [{ all: true}]});
}

module.exports = Product;
