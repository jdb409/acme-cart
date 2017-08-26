const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')('_method');
const path = require('path');
const port = process.env.PORT || 3000;
const db = require('./db');
const Product = require('./db/Product');
const Order = require('./db/Order');

app.use(methodOverride);
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/public', express.static(path.join(__dirname, '/public')));

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache: true });

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
    return Order.findAll()
        .then(orders => {
            return Product.getProducts()
                .then(products => {
                    if (orders.length > 0) {
                        return res.render('index', { products: products, orderId: orders[orders.length - 1].id });
                    }
                    res.render('index', { products: products });
                });
        });


});

app.use('/orders', require('./routes/orders'));

app.get('/', (err, req, res, next) => {
    res.send(err);
})

db.sync()
    .then(() => {
        console.log('synced');
        return db.seed();
    }).then(() => {
        app.listen(port, () => {
            console.log('Listening');
        });
    }).catch(err => {
        console.log(err);
    });