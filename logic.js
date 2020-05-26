var api_key = "***";
var graymap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: api_key
  });
  // We create the map object with options.
  var map = L.map("map", {
    center: [
      40.7, -94.5
    ],
    zoom: 3
  });
graymap.addTo(map)
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson",function(data){
    function styleinfo(feature){
        return{
            radius: getcolor(feature.properties.mag),
            fillColor: getradius(feature.properties.mag),
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8

        }
    }
    function getcolor(magnitude){

        switch (true) {
            case magnitude>5:
                return "red";
            case magnitude>4:
                return "orange";
            case magnitude>3:
                return "yellow";
            case magnitude>2:
                return "brown";
            case magnitude>1:
                return "green";   
            default:
                return "silver";
        }
    }
    function getradius(magnitude){
        return magnitude*4;
    }

    L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
        style:styleinfo,
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
          }
          
    }).addTo(map);
})


// L.geoJSON(someGeojsonFeature, {
//     pointToLayer: function (feature, latlng) {
//         return L.circleMarker(latlng, geojsonMarkerOptions);
//     }
// }).addTo(map);

