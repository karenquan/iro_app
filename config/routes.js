var express = require('express'),
    router  = new express.Router();

module.exports = router;

var colorsController = require('../controllers/colors');
var palettesController = require('../controllers/palettes');

router.get("/colors/top", colorsController.index);
router.get("/colors/:hex", colorsController.show);
router.get("/palettes/top", palettesController.index);
router.get("/palettes/:id", palettesController.show);
