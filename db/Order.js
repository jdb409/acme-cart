const db = require('./db');
const Sequelize = db.Sequelize;

const Order = db.define('order', {
    isCart: {
        type: Sequelize.BOOLEAN
    },
    address: {
        type: Sequelize.STRING
    }
});

module.exports = Order;