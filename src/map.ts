// prettier-ignore
import { FeatureCollection } from "geojson";
import places from "./places.js";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWx1bHNoIiwiYSI6ImNsYWZxaWdubTBkNmkzb3A5Mjl6eTFicHMifQ.gPpYDcA5dnD1qFTBeE1hrw";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-77, 25],
  zoom: 2,
});

map.addControl(new mapboxgl.NavigationControl());

const popup = new mapboxgl.Popup();

function createPopup(
  coordinates: mapboxgl.LngLatLike,
  title: string,
  description: string
) {
  popup
    .setLngLat(coordinates)
    .setHTML(`<div class="markerTitle">${title}</div>${description}`)
    .addTo(map);
}

function getFeatureByTitle(placesGeoJSON: FeatureCollection, title: string) {
  const { features } = placesGeoJSON;
  const featureByTitle = features.filter(
    (feature) => feature.properties?.title === title
  );
  return featureByTitle[0];
}

function getLinkElementByTitle(title: string) {
  const links = Array.from(document.getElementsByClassName("place"));
  const linkByTitle = links.filter(
    (link) => (<HTMLElement>link).innerText === title
  );
  return linkByTitle[0];
}

function fly(coordinates: mapboxgl.LngLatLike, title: string) {
  map.flyTo({
    center: coordinates,
    zoom: 9,
    essential: true,
  });

  const feature = getFeatureByTitle(places, title);
  if (feature.geometry.type === "Point") {
    createPopup(
      <mapboxgl.LngLatLike>feature.geometry.coordinates,
      feature.properties?.title,
      feature.properties?.description
    );
  }
}

function createEventListener(
  element: HTMLElement,
  coordinates: mapboxgl.LngLatLike,
  title: string
) {
  element.addEventListener(
    "click",
    () => {
      fly(coordinates, title);
    },
    false
  );
}

function createPlacesEventListeners(placesGeoJSON: FeatureCollection) {
  const { features } = placesGeoJSON;

  features.forEach((feature) => {
    if (feature.geometry.type === "Point") {
      const link = getLinkElementByTitle(feature.properties?.title);
      createEventListener(
        <HTMLElement>link,
        <mapboxgl.LngLatLike>feature.geometry.coordinates,
        feature.properties?.title
      );
    }
  });
}

createPlacesEventListeners(places);

map.on("load", () => {
  const layer: mapboxgl.AnyLayer = {
    id: "places",
    type: "symbol",
    source: {
      type: "geojson",
      data: places,
    },
    layout: {
      "icon-image": "{icon}-15",
      "icon-allow-overlap": true,
    },
  };
  map.addLayer(layer);
});

map.on("mouseenter", "places", () => {
  map.getCanvas().style.cursor = "pointer";
});

map.on("mouseleave", "places", () => {
  map.getCanvas().style.cursor = "";
});

map.on("click", "places", (event) => {
  const { features } = event;
  if (features) {
    const { geometry } = features[0];
    if (geometry.type === "Point") {
      type CustomProperties = GeoJSON.GeoJsonProperties & {
        description: string;
        title: string;
      };

      const coordinates = geometry.coordinates.slice();
      const { description } = <CustomProperties>features[0].properties;
      const { title } = <CustomProperties>features[0].properties;

      while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      createPopup(<mapboxgl.LngLatLike>coordinates, title, description);
    }
  }
});
