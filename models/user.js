var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var colorSchema = new mongoose.Schema({
  hex: String,
  rgb: Array
});

var colorListSchema = mongoose.Schema({
  name: { type: String, required: true },
  colors: [colorSchema]
});

var paletteSchema = new mongoose.Schema({
  colors: [colorSchema]
});

var paletteListSchema = mongoose.Schema({
  name: { type: String, required: true },
  palettes: [paletteSchema]
});

var userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  colorLists: [colorListSchema],
  paletteLists: [paletteListSchema],
  customPalettes: [paletteListSchema]
});

userSchema.plugin(require('mongoose-bcrypt'));

var User = mongoose.model('User', userSchema);

module.exports = User;

