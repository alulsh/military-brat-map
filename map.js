// eslint-disable-next-line import/extensions
import places from "./places.js";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWx1bHNoIiwiYSI6ImY0NDBjYTQ1NjU4OGJmMDFiMWQ1Y2RmYjRlMGI1ZjIzIn0.pngboKEPsfuC4j54XDT3VA";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-77, 25],
  zoom: 2,
});

map.addControl(new mapboxgl.NavigationControl());

const popup = new mapboxgl.Popup();

function createPopup(coordinates, title, description) {
  popup
    .setLngLat(coordinates)
    .setHTML(`<div class="markerTitle">${title}</div>${description}`)
    .addTo(map);
}

function searchPlacesByTitle(placesGeoJSON, title) {
  const { features } = placesGeoJSON.source.data;
  const featureByTitle = features.filter(
    (feature) => feature.properties.title === title
  );
  return featureByTitle[0];
}

function fly(lat, long, title) {
  map.flyTo({
    center: [long, lat],
    zoom: 9,
    essential: true,
  });

  const feature = searchPlacesByTitle(places, title);
  createPopup(
    feature.geometry.coordinates,
    feature.properties.title,
    feature.properties.description
  );
}

function createEventListeners(index, lat, long, title) {
  const placeClass = `place-${index}`;

  document.getElementById(placeClass).addEventListener(
    "click",
    () => {
      fly(lat, long, title);
    },
    false
  );
}

function loadPlaces(layer) {
  const { features } = layer.source.data;

  for (let i = 0; i < features.length; i++) {
    const feature = features[i];

    const lat = feature.geometry.coordinates[1];
    const long = feature.geometry.coordinates[0];
    const { title } = feature.properties;

    createEventListeners(i, lat, long, title);
  }
}

loadPlaces(places);

map.on("load", () => {
  map.addLayer(places);
});

map.on("mouseenter", "places", () => {
  map.getCanvas().style.cursor = "pointer";
});

map.on("mouseleave", "places", () => {
  map.getCanvas().style.cursor = "";
});

map.on("click", "places", (e) => {
  const coordinates = e.features[0].geometry.coordinates.slice();
  const { description } = e.features[0].properties;
  const { title } = e.features[0].properties;

  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }

  createPopup(coordinates, title, description);
});
