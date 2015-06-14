'use strict';

var  router = require('express').Router();

router.get('/', function(req, res) {
    res.render('./main');
});

module.exports = router;