const db = require('./db');
const Sequelize = db.Sequelize;

const LineItem = db.define('lineItem', {
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
});

module.exports = LineItem;