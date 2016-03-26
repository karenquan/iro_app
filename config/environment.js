var _ = require('lodash');

var localEnvVars = {
  TITLE:      'iro_app',
  SAFE_TITLE: 'iro_app'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
