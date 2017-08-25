const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')('_method');
const path = require('path');
const port = process.env.PORT || 3000;
const db = require('./db');
const Product = require('./db/Product');

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/public', express.static(path.join(__dirname, '/public')));

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache: true });

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
    Product.getProducts()
        .then(products => {
            // console.log(products[0].lineItems[0].quantity);
            res.render('index', {products: products});
        });
});

app.use('/orders', require('./routes/orders'));

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
