const db = require('./db');
const Sequelize = db.Sequelize;

const LineItem = db.define('lineItem', {
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
});

LineItem.destroyLineItem = (orderId, lineItemId) => {
    console.log(orderId, lineItemId);
    return LineItem.destroy({
        where: {
            orderId: orderId,
            id: lineItemId
        }
    });
}

LineItem.getAll = () => {
    return LineItem.findAll({ include: [{ all: true }] })
        .then(items => {
            items = items.sort((a, b) => a.id - b.id);
            return items;
        })
}

module.exports = LineItem;