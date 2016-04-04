// Require resource's model(s).
var User = require("../models/user");

module.exports = {
  create: create,
  show:  show
};

function create(req, res, next) {
  console.log("herro");
  User
    .create(req.body)
    .then(function(user) {
      console.log(user);
      res.send({
        success: true,
        message: "Successfully created user!",
        data: {
          firstName: user.firstName,
          lastName:  user.lastName,
          email:     user.email,
          id:        user._id
        }
      });

    }).catch(function(error) {
      console.log("error :(");
        if (error.message.match(/E11000/)) {
          error.status = 409;
        } else {
          error.status = 422;
        }

        next(error);
      });;
};

function show(req, res, next) {
  User
    .findOne({email: req.decoded.email}).exec()
    .then(function(user) {
      res.json({
        success: true,
        message: "Successfully retrieved user",
        data: data
      });
    })
    .catch(function(error) {
      next(error);
    });
};
