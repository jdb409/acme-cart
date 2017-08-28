const db = require('./db');
const Product = require('./Product');
const Order = require('./Order');
const LineItem = require('./LineItem');

const sync = () => db.sync({ force: true });

const seed = () => {
    return Promise.all([
        Product.create({ name: 'Meat' }),
        Product.create({ name: 'Beer' }),
        Product.create({ name: 'Sunshine' })
        /*Order.create({isCart: true}),
        LineItem.create({productId: 2, quantity: 4, orderId: 1})*/
    ]);
}

LineItem.belongsTo(Product);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);

module.exports = {
    sync, seed,
    models: {
        Product, Order, LineItem
    }
}

