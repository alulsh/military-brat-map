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
function createPopup(coordinates, title, description) {
    popup
        .setLngLat(coordinates)
        .setHTML(`<div class="markerTitle">${title}</div>${description}`)
        .addTo(map);
}
function getFeatureByTitle(placesGeoJSON, title) {
    const { features } = placesGeoJSON;
    const featureByTitle = features.filter((feature) => { var _a; return ((_a = feature.properties) === null || _a === void 0 ? void 0 : _a.title) === title; });
    return featureByTitle[0];
}
function getLinkElementByTitle(title) {
    const links = Array.from(document.getElementsByClassName("place"));
    const linkByTitle = links.filter((link) => link.innerText === title);
    return linkByTitle[0];
}
function fly(coordinates, title) {
    var _a, _b;
    map.flyTo({
        center: coordinates,
        zoom: 9,
        essential: true,
    });
    const feature = getFeatureByTitle(places, title);
    if (feature.geometry.type === "Point") {
        createPopup(feature.geometry.coordinates, (_a = feature.properties) === null || _a === void 0 ? void 0 : _a.title, (_b = feature.properties) === null || _b === void 0 ? void 0 : _b.description);
    }
}
function createEventListener(element, coordinates, title) {
    element.addEventListener("click", () => {
        fly(coordinates, title);
    }, false);
}
function createPlacesEventListeners(placesGeoJSON) {
    const { features } = placesGeoJSON;
    features.forEach((feature) => {
        var _a, _b;
        if (feature.geometry.type === "Point") {
            const link = getLinkElementByTitle((_a = feature.properties) === null || _a === void 0 ? void 0 : _a.title);
            createEventListener(link, feature.geometry.coordinates, (_b = feature.properties) === null || _b === void 0 ? void 0 : _b.title);
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
    const { features } = event;
    if (features) {
        const { geometry } = features[0];
        if (geometry.type === "Point") {
            const coordinates = geometry.coordinates.slice();
            const { description } = features[0].properties;
            const { title } = features[0].properties;
            while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            createPopup(coordinates, title, description);
        }
    }
});
