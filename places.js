const places = {
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
            title: "Williamsburg, VA",
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
            title: "Washington, DC",
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

export default places;
