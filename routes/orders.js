var router = require('express').Router();
const {Order} = require('../db/index').models;

router.post('/:id', (req, res, next) => {
    Order.addProductToCart(req.params.id * 1)
        .then(() => {
            res.redirect('/');
        });
});

module.exports = router;

