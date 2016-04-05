var express = require('express'),
    router  = new express.Router();

module.exports = router;

var usersController = require('../controllers/users');
var token = require('../config/token.auth');

router.post("/users/", usersController.create);
// router.put("/users/me", usersController.update);
router.get("/users/me", token.authenticate, usersController.me);
router.post("/users/me/createColorList", token.authenticate, usersController.createColorList);
router.post("/users/me/createPaletteList", token.authenticate, usersController.createPaletteList);
router.post("/users/me/addColorToList", token.authenticate, usersController.addColorToList);
router.delete("/users/me/removeColor", token.authenticate, usersController.removeColor);
router.delete("/users/me/removeColorList", token.authenticate, usersController.removeColorList);
router.post("/users/me/addPaletteToList", token.authenticate, usersController.addPaletteToList);
router.delete("/users/me/removePalette", token.authenticate, usersController.removePalette);
router.delete("/users/me/removePaletteList", token.authenticate, usersController.removePaletteList);
router.post("/users/me/token", token.authenticate, token.refresh);

router.post("/token", token.create);
