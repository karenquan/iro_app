// Require resource's model(s).
var User = require("../models/user");

module.exports = {
  create: create,
  createColorList: createColorList,
  me:  me
};

function create(req, res, next) {
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

function createColorList(req, res, next) {
  console.log("attempting to create a color list");
  // console.log(req.body);

  User
    .findOne({email: req.decoded.email}).exec()
    .then(function(user) {
      console.log("found user for creating color list");
      user.colorLists.push(req.body); //adding color list
      user.save();
      res.send(user);
    })
    .catch(function(error) {
      console.log("error trying to create a color list");
      next(error);
    });
}

function me(req, res, next) {
  console.log("attempting to find user in database");
  User
    .findOne({email: req.decoded.email}).exec()
    .then(function(user) {
      console.log("found user:", user);
      res.send(user);
      // res.json({
      //   success: true,
      //   message: "Successfully retrieved user",
      //   data: data
      // });
    })
    .catch(function(error) {
      console.log("error trying to find user :(");
      next(error);
    });
};
