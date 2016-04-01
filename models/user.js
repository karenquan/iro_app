var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var User = mongoose.model('User', userSchema);

module.exports = User;

var colorSchema = new mongoose.Schema({
  hex: String
});

var paletteSchema = new mongoose.Schema({
  colors: [colorSchema]
});

var userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true },
  password:  { type: String, required: true },
  colors: [colorSchema],
  palettes: [paletteSchema],
  customPalettes: [paletteSchema]
});


