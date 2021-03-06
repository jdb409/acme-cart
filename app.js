const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')('_method');
const path = require('path');
const port = process.env.PORT || 3000;
const db = require('./db');
const Order = require('./db/Order');


app.use(methodOverride);
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/public', express.static(path.join(__dirname, '/public')));

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache: true });

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
    Order.display()
        .then(result => {
            return res.render('index', { products: result[0], orders: result[1], items: result[2] });
        })
});

app.use('/orders', require('./routes/orders'));

app.use('/', (err, req, res, next) => {
    console.log(err);
    Order.display()
        .then(result => {
            return res.render('index', { products: result[0], orders: result[1], items: result[2], err: 'Address Required!' });
        })
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
