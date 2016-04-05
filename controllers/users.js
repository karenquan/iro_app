// Require resource's model(s).
var User = require("../models/user");

module.exports = {
  addColorToList:      addColorToList,
  addPaletteToList:    addPaletteToList,
  create:              create,
  createColorList:     createColorList,
  createCustomPalette: createCustomPalette,
  createPaletteList:   createPaletteList,
  me:                  me,
  removeColor:         removeColor,
  removeColorList:     removeColorList,
  removePalette:       removePalette,
  removePaletteList:   removePaletteList
};

function addColorToList(req, res, next) {
  var data = req.body;
  console.log("list to add color to:", data.listId);
  console.log("color to add:", data.color);
  User
    .findOne({ email: req.decoded.email }).exec()
    .then(function(user) {
      var color = {
        hex: data.color.hex,
        rgb: data.color.rgb
      };
      user.colorLists.id(data.listId).colors.push(color);
      user.save(function(error, user) {
        if (error) {
          res.send(err);
        }
        res.send(user);
      });
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
    .findOne({ email: req.decoded.email }).exec()
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
      user.save(function(error, user) {
        if (error) {
          res.send(error);
        }
        res.send(user);
      });
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
    .findOne({ email: req.decoded.email }).exec()
    .then(function(user) {
      console.log("found user for creating color list");
      user.colorLists.push(req.body); //adding color list name
      user.save(function(error, user) {
        if (error) {
          res.send(error);
        }
        res.send(user);
      });
    })
    .catch(function(error) {
      console.log("error trying to create a color list");
      next(error);
    });
}

function createPaletteList(req, res, next) {
  console.log(req.body);
  User
    .findOne({ email: req.decoded.email }).exec()
    .then(function(user) {
      console.log("found user for creating a palette list");
      user.paletteLists.push(req.body); //adding palette list name
      user.save(function(error, user) {
        if (error) {
          res.send(error);
        }
        res.send(user);
      });
    })
    .catch(function(error) {
      console.log("error trying to create a palette list");
      next(error);
    });
}

function createCustomPalette(req, res, next) {
  var data = req.body;
  User
    .findOne({ email: req.decoded.email }).exec()
    .then(function(user) {
      console.log(user);
      user.customPalettes.push(data);
      user.save(function(error, user) {
        if (error) {
          res.send(error);
        }

        console.log(user);
        res.send(user);
      });
    })
    .catch(function(error) {
      console.log("error trying to create custom palette");
      res.send(error);
    });
}

function me(req, res, next) {
  User
    .findOne({ email: req.decoded.email }).exec()
    .then(function(user) {
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

function removeColor(req, res, next) {
  console.log('remove color from list');
  var data = req.body;
  console.log(data);
  User
    .findOne({ email: req.decoded.email }).exec()
    .then(function(user) {
      var colorList = user.colorLists.id(data.colorListId);
      colorList.colors.id(data.colorId).remove();
      user.save(function(error, user) {
        if (error) {
          res.send(error);
        }
        res.send(user);
      });
    })
    .catch(function(error) {
      console.log("error trying to remove a color");
      next(error);
    });
}

function removeColorList(req, res, next) {
  console.log("MADE IT INTO COLOR LIST REMOVAL");
  console.log(req.body);
  User
    .findOne({ email: req.decoded.email }).exec()
    .then(function(user) {
      user.colorLists.id(req.body.listId).remove();
      user.save(function(error, user) {
        if (error) {
          res.send(error);
        }
        res.send(user);
      });
    })
    .catch(function(error) {
      console.log("error trying to remove a color list");
      next(error);
    });
}

function removePalette(req, res, next) {
  console.log("MADE IT INTO PALETTE REMOVAL");
  var data = req.body;
  User
    .findOne({ email: req.decoded.email }).exec()
    .then(function(user) {
      var paletteList = user.paletteLists.id(data.paletteListId);
      paletteList.palettes.id(data.paletteId).remove();
      user.save(function(error, user) {
        if (error) {
          res.send(error);
        }
        res.send(user);
      });
    })
    .catch(function(error) {
      console.log("error trying to remove a palette");
      next(error);
    });
}

function removePaletteList(req, res, next) {
  console.log("MADE IT INTO PALETTE LIST REMOVAL");
  var data = req.body;
  User
    .findOne({ email: req.decoded.email }).exec()
    .then(function(user) {
      user.paletteLists.id(data.listId).remove();
      user.save(function(error, user) {
        if (error) {
          res.send(error);
        }
        res.send(user);
      });
    });
}
