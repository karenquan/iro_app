var request = require('request');

module.exports = {
  index: index,
  show: show
};

function index(req, res, next) {
  var numResults = parseInt(req.query.num);
  var uri = process.env.COLOR_URL_ENDPOINT + "colors/top?numResults=" + numResults + "&" + process.env.DATA_FORMAT;
  console.log("URI:", uri);
  request({
    method: "GET",
    uri: uri
  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
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

function show(req, res, next) {
  var hex = req.params.hex;
  var uri = process.env.COLOR_URL_ENDPOINT + "color/" + hex + '&' + process.env.DATA_FORMAT;

  request({
    method: "GET",
    uri: uri
  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(JSON.parse(response.body)); // color object
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
