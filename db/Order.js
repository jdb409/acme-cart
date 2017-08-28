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
    return Order.find({
        where: {
            address: null
        }
    }).then(order => {
        if (order === null) {
            return Order.create()
        } else {
            return order;
        }
    })
}

Order.getItem = (productId) => {
    return Order.getCart()
        .then((order) => {
            return LineItem.find({
                where: { productId: productId, orderId: order.id }
            }).then(item => {
                if (item === null) {
                    return LineItem.create({
                        productId: productId,
                        orderId: order.id
                    })
                } else {
                    return item;
                }
            })
        })
}

Order.addProductToCart = (productId) => {
    return Order.getItem(productId)
        .then((lineItem) => {
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
