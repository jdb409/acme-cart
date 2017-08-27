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

Order.addProductToCart = (productId) => {
    return Promise.all([Order.findOrCreate({
        where: {
            address: null
        }
    }), LineItem.findOrCreate({
        where: { productId: productId }

    })]).then(result => {
        var order = result[0][0];
        var lineItem = result[1][0];
        console.log(lineItem);
        lineItem.orderId = order.id;
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
