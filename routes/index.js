var express = require('express');
var router = express.Router();
var yelpCredentials = require('../config');
var yelp = require('yelp').createClient(yelpCredentials);

router.get('/', function(req, res, next) {

  var ll = req.query.ll;
  var latLong = ll.split(','); // latitude, longitude
  var latitude = latLong[0];
  var longitude = latLong[1];

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  yelp.search({term: 'bar', ll: ll, sort: 1}, function(err, data) {
    if (err) {
      // todo
    }
    res.send({'bars': data.businesses});
  });
  
});

module.exports = router;
