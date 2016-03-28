var express = require('express'),
    router  = new express.Router();

module.exports = router;

var colorsController = require('../controllers/colors');
var palettesController = require('../controllers/palettes');

router.get("/colors/top", colorsController.getTopColors);
