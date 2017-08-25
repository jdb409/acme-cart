var router = require('express').Router();

router.get('/', (req, res, next) => {
    res.send('Orders!');
})

module.exports = router;

