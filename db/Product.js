const db = require('./db');
const Sequelize = db.Sequelize;

const Product = db.define('product', {
    name: {
        type: Sequelize.STRING
    }
});

Product.getProducts = () => {
    return Product.findAll();
}

module.exports = Product;
