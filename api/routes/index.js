var express = require('express');
var router = express.Router();
var yelp = require('yelp').createClient({
  consumer_key: 'XMywZGNkpWh27JEtNNt5QQ', 
  consumer_secret: 'GmgT1BEMZVLOaZW4FRm7Du_nvQo',
  token: '56HxOnxR_EAtTvHP1a4oW4POGAxceP10',
  token_secret: 'BVdu_j35wBKNpj83wmafuek8L-Y'
});

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
