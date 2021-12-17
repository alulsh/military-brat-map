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

function getFeatureByTitle(placesGeoJSON, title) {
  const { features } = placesGeoJSON.source.data;
  const featureByTitle = features.filter(
    (feature) => feature.properties.title === title
  );
  return featureByTitle[0];
}

function getLinkElementByTitle(title) {
  const links = Array.from(document.getElementsByClassName("place"));
  const linkByTitle = links.filter((link) => (<HTMLElement>link).innerText === title);
  return linkByTitle[0];
}

function fly(coordinates, title) {
  map.flyTo({
    center: coordinates,
    zoom: 9,
    essential: true,
  });

  const feature = getFeatureByTitle(places, title);
  createPopup(
    feature.geometry.coordinates,
    feature.properties.title,
    feature.properties.description
  );
}

function createEventListener(element, coordinates, title) {
  element.addEventListener(
    "click",
    () => {
      fly(coordinates, title);
    },
    false
  );
}

function createPlacesEventListeners(layer) {
  const { features } = layer.source.data;

  features.forEach((feature) => {
    const link = getLinkElementByTitle(feature.properties.title);
    createEventListener(
      link,
      feature.geometry.coordinates,
      feature.properties.title
    );
  });
}

createPlacesEventListeners(places);

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
  const geometry = e.features[0].geometry;
  if (geometry.type === "Point") {
    const coordinates = geometry.coordinates.slice();
    const { description } = e.features[0].properties;
    const { title } = e.features[0].properties;

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    createPopup(coordinates, title, description);
  }
});
