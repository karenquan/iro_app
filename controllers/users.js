// Require resource's model(s).
var User = require("../models/user");

module.exports = {
  addColorToList: addColorToList,
  create: create,
  createColorList: createColorList,
  me:  me
};

function addColorToList(req, res, next) {
  var data = req.body;
  console.log("list to add color to:", data.listId);
  console.log("color to add:", data.color);
  User
    .findOne({email: req.decoded.email}).exec()
    .then(function(user) {
      console.log("found user to add color to list");
      var selectedList = user.colorLists.filter(function(list) {
        return list._id == data.listId;
      });
      var color = {
        hex: data.color.hex,
        rgb: data.color.rgb
      };
      console.log(color);
      selectedList[0].colors.push(color);
      console.log(selectedList);
      user.save();
      res.send(user);
    })
    .catch(function(error) {
      console.log("error trying to add a color to a list");
      next(error);
    });
}

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
