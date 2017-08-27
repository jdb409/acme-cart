var router = require('express').Router();
const { Order, LineItem } = require('../db/index').models;

router.post('/:id', (req, res, next) => {
    Order.addProductToCart(req.params.id)
        .then(() => {
            res.redirect('/');
        });
});
router.put('/:orderId', (req, res, next) => {
    Order.updateFromRequestBody(req.params.orderId, req.body.address)
        .then(order => {
            return res.redirect('/');
        }).catch(next);

})

router.delete('/:orderId/orders/:LineId', (req, res, next) => {
    LineItem.destroyLineItem(req.params.orderId, req.params.LineId)
        .then(() => res.redirect('/'))
        .catch(next);
});

module.exports = router;

