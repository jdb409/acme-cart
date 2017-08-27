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
    return Order.findOrCreate({
        where: {
            address: null
        },
        defaults: {
            isCart: true
        }
    }).then((result) => {
        var order = result[0]
        return LineItem.findOrCreate({
            where: { productId: productId, orderId: order.id },
            defaults: {
                orderId: order.id
            }
        }).then((result) => {
            var lineItem = result[0];
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
}

module.exports = Order;
