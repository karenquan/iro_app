// Require resource's model(s).
var User = require("../models/user");

module.exports = {
  create: create,
  show:  show
};

var create = function(req, res, next) {
  User
    .create(req.body)
    .then(function(user) {
      res.json({
        success: true,
        message: 'Successfully created user!',
        data: {
          firstName: user.firstName,
          lastName:  user.lastName,
          email:     user.email,
          id:        user._id
        }
      }).catch(function(error) {
        if (err.message.match(/E11000/)) {
          err.status = 409;
        } else {
          err.status = 422;
        }
        next(err);
      });
    });
};

var show = function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      res.json({message: 'Could not find user because ' + err});
    } else if (!user) {
      res.json({message: 'No user with this id.'});
    } else {
      res.render('users/show', {user: user});
    }
  });
};
