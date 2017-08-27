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
const LineItem = require('./db/LineItem');

app.use(methodOverride);
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/public', express.static(path.join(__dirname, '/public')));

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache: true });

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
    Product.getProducts()
        .then(products => {
            res.locals.products = products;
            return Order.getAll();
        }).then(orders => {
            console.log(orders);
            return LineItem.findAll({include: [{all: true}]})
            .then(items => {
                console.log('items',items);
                res.render('index', {products: res.locals.products, orders: orders, items: items});
            })
            
        }).catch(next);
});

app.use('/orders', require('./routes/orders'));

app.use('/', (err, req, res, next) => {
    console.log(err);
    res.render('error', { err: err });
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
