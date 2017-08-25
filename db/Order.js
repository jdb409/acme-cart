const db = require('./db');
const Sequelize = db.Sequelize;
const LineItem = require('./LineItem');

const Order = db.define('order', {
    isCart: {
        type: Sequelize.BOOLEAN
    },
    address: {
        type: Sequelize.STRING
    }
});

Order.addProductToCart = (productId) => {
    return LineItem.findOrCreate({
        where: { productId: productId }
    }).spread((lineItem, created) => {
        if (created) {
            lineItem.productId = productId;
        }
        lineItem.quantity++;
        return lineItem.save();
    }).then((lineItem) => {
        return Order.findOrCreate({
            where: {
                isCart: true
            },
            defaults: {
                isCart: true
            }
        }).spread((order, created) => {
            lineItem.setOrder(order);
        })
    }).catch(console.log);
}

module.exports = Order;
