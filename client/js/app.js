'use strict';

$('#barList').hide();
$('footer').hide();

// Get current location
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var latLong = latitude.toString() + ',' + longitude.toString();
    $('#loader').show();
    $.get( "http://localhost:3000?ll=" + latLong, function(data) {})
    .done(function(data) {
      ko.applyBindings(new ViewModelBar(data, latLong));
    });
  });
} 


function ViewModelBar(response, latLong) {
  var self = this;

  self.bars = ko.observableArray(response.bars);

  var DIRECTIONS_BASE_URL = 'https://www.google.com/maps/dir/' + latLong + '/';

  var RATINGS = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

  var RATINGSTYLES = [
    'zero',
    'zeroPointFive',
    'one',
    'onePointFive',
    'two',
    'twoPointFive',
    'three',
    'threePointFive',
    'four',
    'fourPointFive',
    'five'
  ];

  // apply ratingClass property to each bar item to position stars sprite
  // apply a displayCategories property to each bar item to list tags
  // apply a directionsURL property to each bar item
  self.bars().forEach(function(value, index) {
    self.bars()[index].displayCategories = [];
    self.bars()[index].directionsURL = DIRECTIONS_BASE_URL + self.bars()[index].location.display_address;
    for (var i = 0; i < RATINGS.length; i++) {
      if (value.rating === RATINGS[i]) {
        self.bars()[index].ratingClass = RATINGSTYLES[i];
      }
    }
    for (var j = 0; j < value.categories.length; j++) {
      self.bars()[index].displayCategories.push({tag: self.bars()[index].categories[j][0]});
    }
  });

  console.log(self.bars());

  // Hide the loader and show the list of bars
  $('#loader').hide();
  $('#barList, footer').fadeIn(200);
}


