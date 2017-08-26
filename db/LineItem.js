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
module.exports = LineItem;