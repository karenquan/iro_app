var express = require('express'),
    router  = new express.Router();

module.exports = router;

var usersController = require('../controllers/users');
var token = require('../config/token.auth');

// NEED TO MAKE THESE RESTFUL ROUTES...
router.post("/users", usersController.create);
router.get("/users/me", token.authenticate, usersController.me);
router.post("/users/me/addColorToList", token.authenticate, usersController.addColorToList);
router.post("/users/me/addPaletteToList", token.authenticate, usersController.addPaletteToList);
router.post("/users/me/createColorList", token.authenticate, usersController.createColorList);
router.post("/users/me/createCustomPalette", token.authenticate, usersController.createCustomPalette);
router.post("/users/me/createPaletteList", token.authenticate, usersController.createPaletteList);
router.delete("/users/me/removeColor", token.authenticate, usersController.removeColor);
router.delete("/users/me/removeColorList", token.authenticate, usersController.removeColorList);
router.delete("/users/me/removeCustomPalette", token.authenticate, usersController.removeCustomPalette);
router.delete("/users/me/removePalette", token.authenticate, usersController.removePalette);
router.delete("/users/me/removePaletteList", token.authenticate, usersController.removePaletteList);
router.put("/users/me/updateColorListName", token.authenticate, usersController.updateColorListName);
router.put("/users/me/updatePaletteListName", token.authenticate, usersController.updatePaletteListName);
router.post("/users/me/token", token.authenticate, token.refresh);
router.post("/token", token.create);
