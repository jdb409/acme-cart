const db = require('./db');
const Sequelize = db.Sequelize;
const LineItem = require('./LineItem');

const Order = db.define('order', {
    isCart: {
        type: Sequelize.BOOLEAN
    },
    address: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        }
    }
});

Order.getCart = () => {
    return Order.findOrCreate({
        where: {
            address: null
        }
    });
}

Order.getItem = (productId) => {
    return Order.getCart()
        .spread((order) => {
            return LineItem.findOrCreate({
                where: { productId: productId, orderId: order.id }, defaults: {
                    orderId: order.id
                }
            });
        })
}

Order.addProductToCart = (productId) => {
    return Order.getItem(productId)
        .spread((lineItem) => {
            lineItem.productId = productId;
            lineItem.quantity++;
            return lineItem.save();
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
}

module.exports = Order;
