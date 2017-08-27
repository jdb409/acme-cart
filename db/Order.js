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
    return Order.findOrCreate({
        where: {
            address: null
        },
        defaults: {
            isCart: true
        }
    }).spread((order) => {
        return LineItem.findOrCreate({
            where: { productId: productId, orderId: order.id },
            defaults: {
                orderId: order.id
            }
        }).spread((lineItem) => {
            lineItem.productId = productId;
            lineItem.quantity++;
            return lineItem.save();
        })
    })

}

Order.updateFromRequestBody = (orderId, address) => {
    return Order.findById(orderId)
        .then((order) => {
            order.address = address;
            return order.save();
        });
}

Order.getAll = () => {
    return Order.findAll({ include: [{ all: true }] })
        .then(orders => {
           return orders;

        });
}

module.exports = Order;
