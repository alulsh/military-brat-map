L.mapbox.accessToken = 'pk.eyJ1IjoiYWx1bHNoIiwiYSI6ImY0NDBjYTQ1NjU4OGJmMDFiMWQ1Y2RmYjRlMGI1ZjIzIn0.pngboKEPsfuC4j54XDT3VA';

var map = L.mapbox.map('map-init', 'mapbox.streets', { zoomControl: false })
    .setView([38.898, -77.043], 2);

new L.Control.Zoom({ position: 'topright' }).addTo(map);

function fly(lat, long, title) {

    map.setView([lat, long], 7);

    placesLayer.eachLayer(function(marker){

    if(marker.feature.properties.title === title) {

        marker.openPopup();

    }

})

}

function createEventListeners(index, lat, long, title) {

    var placeClass = 'place-' + index;
    
    document.getElementById(placeClass).addEventListener('click', function() {

      fly(lat, long, title);

    }, false);

}

function loadPlaces(data){

    var places = data.features;

    for (var i = 0; i < places.length; i++) {

        var place = places[i];

        var lat = place.geometry.coordinates[1];
        var long = place.geometry.coordinates[0];
        var title = place.properties.title;

        createEventListeners(i, lat, long, title);

    }

}

var markers = {
  'type': 'FeatureCollection',
  'features': [
    {
      'type': 'Feature',
      'properties': {
        'title': 'Fort Bragg, NC',
        'marker-symbol': 'heliport',
        'description': '1989 - 1990<br>I was born here. Have been back to visit once since.'
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [
          -79.006,
          35.139
        ]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        'title': 'Los Angeles, CA',
        'marker-symbol': 'heliport',
        'description': '1990 - 1992'
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [
          -118.2427,
          34.0537
        ]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        'title': 'Fort Greely, AK',
        'marker-symbol': 'park',
        'description': '1992 - 1995<br>Lots of moose.'
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [
          -146.249099,
          63.908265
        ]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        'title': 'Fort Leavenworth, KS',
        'marker-symbol': 'bicycle',
        'description': '1995 - 1996<br>I learned to ride a bike here.'
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [
          -94.9216,
          39.3451
        ]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        'title': 'Springfield, VA',
        'marker-symbol': 'school',
        'description': '1996 - October 1998'
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [
          -77.187,
          38.7891
        ]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        'title': 'Monterey, CA',
        'marker-symbol': 'school',
        'description': 'October 1998 - July 1999<br>Defense Language Institute'
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [
          -121.8946,
          36.6003
        ]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        'title': 'Paris, France',
        'marker-symbol': 'school',
        'description': 'July 1999 - August 2004<br>Je me souviens.'
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [
          2.320582,
          48.859489
        ]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        'title': 'Hanscom Air Force Base, MA',
        'marker-symbol': 'school',
        'description': 'August 2004 - May 2008<br>High school.'
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [
          -71.277862,
          42.46153
        ]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        'title': 'Brussels, Belgium',
        'marker-symbol': 'town-hall',
        'description': 'May 2008 - July 2011<br>Winter and summer breaks from college.'
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [
          4.3488,
          50.8504
        ]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        'title': 'Williamsburg, Virginia',
        'marker-symbol': 'college',
        'description': 'August 2008 - May 2012<br>The College of William & Mary'
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [
          -76.7075,
          37.2707
        ]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        'title': 'Chengdu, China',
        'marker-symbol': 'college',
        'description': 'July-August 2011<br>Study Abroad'
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [
          104.0667,
          30.6636
        ]
      }
    },
    {
      'type': 'Feature',
      'properties': {
        'title': 'Washington, D.C.',
        'marker-symbol': 'rocket',
        'description': 'May 2012 - Present'
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [
          -77.0366,
          38.895
        ]
      }
    }
  ]
};

var placesLayer = L.mapbox.featureLayer().setGeoJSON(markers).addTo(map);

loadPlaces(markers);