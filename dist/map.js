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
    const { features } = placesGeoJSON;
    const featureByTitle = features.filter((feature) => feature.properties.title === title);
    return featureByTitle[0];
}
function getLinkElementByTitle(title) {
    const links = Array.from(document.getElementsByClassName("place"));
    const linkByTitle = links.filter((link) => link.innerText === title);
    return linkByTitle[0];
}
function fly(coordinates, title) {
    map.flyTo({
        center: coordinates,
        zoom: 9,
        essential: true,
    });
    const feature = getFeatureByTitle(places, title);
    if (feature.geometry.type === "Point") {
        createPopup(feature.geometry.coordinates, feature.properties.title, feature.properties.description);
    }
}
function createEventListener(element, coordinates, title) {
    element.addEventListener("click", () => {
        fly(coordinates, title);
    }, false);
}
function createPlacesEventListeners(places) {
    const { features } = places;
    features.forEach((feature) => {
        if (feature.geometry.type === "Point") {
            const link = getLinkElementByTitle(feature.properties.title);
            createEventListener(link, feature.geometry.coordinates, feature.properties.title);
        }
    });
}
createPlacesEventListeners(places);
map.on("load", () => {
    const layer = {
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
    const geometry = event.features[0].geometry;
    if (geometry.type === "Point") {
        const coordinates = geometry.coordinates.slice();
        const { description } = event.features[0].properties;
        const { title } = event.features[0].properties;
        while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        createPopup(coordinates, title, description);
    }
});
