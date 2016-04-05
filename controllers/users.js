// Require resource's model(s).
var User = require("../models/user");

module.exports = {
  addColorToList: addColorToList,
  addPaletteToList: addPaletteToList,
  create: create,
  createColorList: createColorList,
  createPaletteList: createPaletteList,
  me:  me,
  removeColorFromList: removeColorFromList
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

function addPaletteToList(req, res, next) {
  var data = req.body;
  console.log("list to add palette to:", data.listId);
  console.log("palette colors to add:", data.palette.colors);
  User
    .findOne({email: req.decoded.email}).exec()
    .then(function(user) {
      console.log("found user to add palette to list");
      var selectedList = user.paletteLists.filter(function(list) {
        return list._id == data.listId;
      });
      var palette = {
        id:     data.palette.id,
        name:   data.palette.title,
        colors: data.palette.colors
      };
      selectedList[0].palettes.push(palette);
      user.save();
      res.send(user);
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
      user.colorLists.push(req.body); //adding color list name
      user.save();
      res.send(user);
    })
    .catch(function(error) {
      console.log("error trying to create a color list");
      next(error);
    });
}

function createPaletteList(req, res, next) {
  console.log(req.body);
  User
    .findOne({email: req.decoded.email}).exec()
    .then(function(user) {
      console.log("found user for creating a palette list");
      user.paletteLists.push(req.body); //adding palette list name
      user.save();
      res.send(user);
    })
    .catch(function(error) {
      console.log("error trying to create a palette list");
      next(error);
    });
}

function me(req, res, next) {
  // console.log("attempting to find user in database");
  User
    .findOne({email: req.decoded.email}).exec()
    .then(function(user) {
      // console.log("found user:", user);
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

function removeColorFromList(req, res, next) {
  console.log('remove color from list');
  var data = req.body;
  console.log(data);
  User
    .findOne({email: req.decoded.email}).exec()
    .then(function(user) {
      // console.log("found user to remove a color from a list", user);
      // var listWithColorToRemove = user.colorLists.filter(function(list) {
      //   list._id ==
      // });
      res.send(user);
    })
    .catch(function(error) {
      console.log("error trying to remove a color");
      next(error);
    });
}
