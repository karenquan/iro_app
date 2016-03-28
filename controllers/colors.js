var request = require('request');

module.exports = {
  getTopColors: getTopColors
};

var COLOR_URL_ENDPOINT = "http://www.colourlovers.com/api/";
var DATA_FORMAT = "?format=json";

function getTopColors(req, res, next) {
  var uri = COLOR_URL_ENDPOINT + "colors/top" + DATA_FORMAT;
  request({
    method: "GET",
    uri: uri
  }, function(error, response, body) {
    if(!error && response.statusCode == 200) {
      res.send(JSON.parse(response.body));
    } else if (error) {
      next(error);
    } else {
      var errorObject = {
        message: "Unknown status code received.",
        body: body,
        uri: uri
      };
      next(errorObject);
    }
  });
}
