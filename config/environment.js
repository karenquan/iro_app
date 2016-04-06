var _ = require('lodash');

var localEnvVars = {
  TITLE:      'iro_app',
  SAFE_TITLE: 'iro_app',
  COLOR_URL_ENDPOINT: 'http://www.colourlovers.com/api/',
  DATA_FORMAT: 'format=json',
  TOKEN_SECRET: 'herro'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
