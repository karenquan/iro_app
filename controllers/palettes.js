var request = require('request');

module.exports = {
  index: index,
  show: show,
  search: search
};

function index(req, res, next) {
  var numResults = parseInt(req.query.num);
  var uri = process.env.COLOR_URL_ENDPOINT + "palettes/top?numResults=" + numResults + "&" + process.env.DATA_FORMAT;
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
  var id = req.params.id;
  var uri = process.env.COLOR_URL_ENDPOINT + "palette/" + id + '&' + process.env.DATA_FORMAT;

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

function search(req, res, next) {
  var hex = req.params.hex;
  var page = parseInt(req.query.page);
  var numResults = parseInt(req.query.num);
  var offset = page == 1 ? 0 : page * numResults;
  var uri = process.env.COLOR_URL_ENDPOINT + "palettes?hex=" + hex + "&numResults=" + numResults + "&resultOffset=" + offset + "&" + process.env.DATA_FORMAT;

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
