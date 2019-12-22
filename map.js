mapboxgl.accessToken = 'pk.eyJ1IjoiYWx1bHNoIiwiYSI6ImY0NDBjYTQ1NjU4OGJmMDFiMWQ1Y2RmYjRlMGI1ZjIzIn0.pngboKEPsfuC4j54XDT3VA';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-77.043, 38.898],
  zoom: 2,
});

map.addControl(new mapboxgl.NavigationControl());

const markers = {
  id: 'places',
  type: 'symbol',
  source: {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-79.006, 35.139],
          },
          properties: {
            title: 'Fort Bragg, NC',
            icon: 'heliport',
            description: '1989 - 1990<br>I was born here. Have been back to visit once since.',
          },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-118.2427, 34.0537],
          },
          properties: {
            title: 'Los Angeles, CA',
            icon: 'heliport',
            description: '1990 - 1992',
          },
        },
      ],
    },
  },
  layout: {
    'icon-image': '{icon}-15',
    'icon-allow-overlap': true,
  },
};

function createPopUpHtml(title, description) {
  const popUpHTML = `<div class="markerTitle">${title}</div>${description}`;

  return popUpHTML;
}

map.on('load', () => {
  map.addLayer(markers);

  map.on('click', 'places', (e) => {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const { description } = e.features[0].properties;
    const { title } = e.features[0].properties;

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(createPopUpHtml(title, description))
      .addTo(map);
  });

  map.on('mouseenter', 'places', () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'places', () => {
    map.getCanvas().style.cursor = '';
  });
});

function fly(lat, long, title) {
  map.flyTo({
    center: [long, lat],
    zoom: 9,
    essential: true,
  });

  markers.source.data.features.forEach((marker) => {
    if (marker.properties.title === title) {
      new mapboxgl.Popup()
        .setLngLat([long, lat])
        .setHTML(createPopUpHtml(marker.properties.title, marker.properties.description))
        .addTo(map);
    }
  });
}

function createEventListeners(index, lat, long, title) {
  const placeClass = `place-${index}`;

  document.getElementById(placeClass).addEventListener('click', () => {
    fly(lat, long, title);
  }, false);
}

function loadPlaces(data) {
  const places = data.source.data.features;

  for (let i = 0; i < places.length; i++) {
    const place = places[i];

    const lat = place.geometry.coordinates[1];
    const long = place.geometry.coordinates[0];
    const { title } = place.properties;

    createEventListeners(i, lat, long, title);
  }
}

loadPlaces(markers);
