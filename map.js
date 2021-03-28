mapboxgl.accessToken =
  "pk.eyJ1IjoiYWx1bHNoIiwiYSI6ImY0NDBjYTQ1NjU4OGJmMDFiMWQ1Y2RmYjRlMGI1ZjIzIn0.pngboKEPsfuC4j54XDT3VA";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-77, 25],
  zoom: 2,
});

map.addControl(new mapboxgl.NavigationControl());

const markers = {
  id: "places",
  type: "symbol",
  source: {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-79.006, 35.139],
          },
          properties: {
            title: "Fort Bragg, NC",
            icon: "heliport",
            description:
              "1989 - 1990<br>I was born here. Have been back to visit once since.",
          },
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-118.2427, 34.0537],
          },
          properties: {
            title: "Los Angeles, CA",
            icon: "heliport",
            description: "1990 - 1992",
          },
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-146.249099, 63.908265],
          },
          properties: {
            title: "Fort Greely, AK",
            icon: "park",
            description: "1992 - 1995<br>Lots of moose.",
          },
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-94.9216, 39.3451],
          },
          properties: {
            title: "Fort Leavenworth, KS",
            icon: "bicycle",
            description: "1995 - 1996<br>I learned to ride a bike here.",
          },
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-77.187, 38.7891],
          },
          properties: {
            title: "Springfield, VA",
            icon: "school",
            description: "1996 - October 1998",
          },
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-121.8946, 36.6003],
          },
          properties: {
            title: "Monterey, CA",
            icon: "school",
            description:
              "October 1998 - July 1999<br>Defense Language Institute",
          },
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [2.320582, 48.859489],
          },
          properties: {
            title: "Paris, France",
            icon: "school",
            description: "July 1999 - August 2004<br>Je me souviens.",
          },
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-71.277862, 42.46153],
          },
          properties: {
            title: "Hanscom Air Force Base, MA",
            icon: "school",
            description: "August 2004 - May 2008<br>High school.",
          },
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [4.3488, 50.8504],
          },
          properties: {
            title: "Brussels, Belgium",
            icon: "town-hall",
            description:
              "May 2008 - July 2011<br>Winter and summer breaks from college.",
          },
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-76.7075, 37.2707],
          },
          properties: {
            title: "Williamsburg, Virginia",
            icon: "college",
            description:
              "August 2008 - May 2012<br>The College of William & Mary",
          },
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [104.0667, 30.6636],
          },
          properties: {
            title: "Chengdu, China",
            icon: "college",
            description: "July-August 2011<br>Study Abroad",
          },
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-77.0366, 38.895],
          },
          properties: {
            title: "Washington, D.C.",
            icon: "rocket",
            description: "May 2012 - Present",
          },
        },
      ],
    },
  },
  layout: {
    "icon-image": "{icon}-15",
    "icon-allow-overlap": true,
  },
};

function createPopUpHtml(title, description) {
  const popUpHTML = `<div class="markerTitle">${title}</div>${description}`;

  return popUpHTML;
}

const popup = new mapboxgl.Popup();

map.on("load", () => {
  map.addLayer(markers);

  map.on("click", "places", (e) => {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const { description } = e.features[0].properties;
    const { title } = e.features[0].properties;

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    popup
      .setLngLat(coordinates)
      .setHTML(createPopUpHtml(title, description))
      .addTo(map);
  });

  map.on("mouseenter", "places", () => {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", "places", () => {
    map.getCanvas().style.cursor = "";
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
      popup
        .setLngLat([long, lat])
        .setHTML(
          createPopUpHtml(
            marker.properties.title,
            marker.properties.description
          )
        )
        .addTo(map);
    }
  });
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
