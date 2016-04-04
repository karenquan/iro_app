var express = require('express'),
    router  = new express.Router();

module.exports = router;

var usersController = require('../controllers/users');
var token = require('../config/token.auth');

router.post("/users/", usersController.create);

router.post("/token", token.create);
router.get("/users/me", token.authenticate, usersController.me);
// router.put("/users/me", usersController.update);
