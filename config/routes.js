var express = require('express'),
    router  = new express.Router();

module.exports = router;

var colorsController = require('../controllers/colors');
var palettesController = require('../controllers/palettes');
// var usersController = require('../controllers/users');
// var token = require('../config/token.auth');

router.get("/colors/top", colorsController.index);
router.get("/colors/:hex", colorsController.show);
router.get("/palettes/top", palettesController.index);
router.get("/palettes/:id", palettesController.show);

// router.post("/users/", usersController.create);
// router.post("/token", token.create);
// router.get("/users/me", token.authenticate, usersController.me);
// router.put("/users/me", usersController.update);

