// Custom built mapbox layers
var TreeCanopy = L.tileLayer(
'https://api.mapbox.com/styles/v1/saschu/cks0vh22e30ud18k6fym4awq7/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2FzY2h1IiwiYSI6ImNrZ3poNGVkYjA1b3Ayd3JzOHczb29iNjEifQ.MqXTIcUhZl4C-s0Jk5o49A', {
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1,
    attribution: 'Basemap tiles by <a href="https://www.mapbox.com/">MapBox</a>',
});
var NDVI = L.tileLayer(
'https://api.mapbox.com/styles/v1/saschu/cks0vhr2d18vx18rjywiek8m4/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2FzY2h1IiwiYSI6ImNrZ3poNGVkYjA1b3Ayd3JzOHczb29iNjEifQ.MqXTIcUhZl4C-s0Jk5o49A', {
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1,
    attribution: 'Basemap tiles by <a href="https://www.mapbox.com/">MapBox</a>',
});
var Equity = L.tileLayer(
'https://api.mapbox.com/styles/v1/saschu/cks0veb3p1bdb17p6s7xkudfl/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2FzY2h1IiwiYSI6ImNrZ3poNGVkYjA1b3Ayd3JzOHczb29iNjEifQ.MqXTIcUhZl4C-s0Jk5o49A', {
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1,
    attribution: 'Basemap tiles by <a href="https://www.mapbox.com/">MapBox</a>',
});
var Satellite = L.tileLayer(
'https://api.mapbox.com/styles/v1/saschu/cks54ukm13s5a17oq7y4rh5d0/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2FzY2h1IiwiYSI6ImNrZ3poNGVkYjA1b3Ayd3JzOHczb29iNjEifQ.MqXTIcUhZl4C-s0Jk5o49A', {
    id: 'mapbox/sattelite-streets',
    tileSize: 512,
    zoomOffset: -1,
    attribution: 'Basemap tiles by <a href="https://www.mapbox.com/">MapBox</a>',
});

// Create a map
var map = L.map('map', {
  center: [47.24, -122.48],
  zoom: 12,
  minZoom: 11,
  defaultExtentControl: true,
  layers: [TreeCanopy],
});

// Geocoding!
var bounds = L.latLngBounds([47.1, -122.7],[47.4, -122.2]);
var searchControl = L.esri.Geocoding.geosearch({
  useMapBounds: false,
  searchBounds: bounds
}).addTo(map);
var results = L.layerGroup().addTo(map);
searchControl.on('results', function (data) {
  results.clearLayers();
  for (var i = data.results.length - 1; i >= 0; i--) {
      results.addLayer(L.marker(data.results[i].latlng));
    }
})

// These two sections build out the layer control
var maplayers = {
  "Tree Canopy Cover": TreeCanopy,
  "NDVI (zoom in to see)": NDVI,
  "Equity/Opportunity Index": Equity,
  "Satellite View": Satellite,
};

L.control.layers(maplayers, null,{collapsed:false}).addTo(map);

// Legends: how-to from http://plnkr.co/edit/a8tRcba0kr3sLeYNuDPC?p=preview&preview
var LegendTreeCanopy = L.control({
  position: 'topright'
});
var LegendNDVI = L.control({
  position: 'topright'
});
var LegendEquity = L.control({
  position: 'topright'
});
var LegendSatellite = L.control({
  position: 'topright'
});

// My thanks to John on Codepen for this manual legend builder
// https://codepen.io/haakseth/pen/KQbjdO
LegendTreeCanopy.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Tree Canopy Cover, 2017</h4>";
  div.innerHTML += '<i style="background: #267300"></i><span>Tree Canopy</span><br>';
  div.innerHTML += '<i style="border-color:#ff0000; border-width:2; border-style:solid"></i><span>Park Boundary</span><br>';
  return div;
};
LegendNDVI.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Normalized Difference<br>Vegetation Index, 2017</h4>";
  div.innerHTML += '<i style="background: #007206"></i><span>Very Healthy</span><br>';
  div.innerHTML += '<i style="background: #a4d016"></i><span>Moderately Healthy</span><br>';
  div.innerHTML += '<i style="background: #fcc813"></i><span>Unhealthy</span><br>';
  div.innerHTML += '<i style="background: #fc3b09"></i><span>Inanimate</span><br>';
  div.innerHTML += '<i style="border-color:#ff0000; border-width:2; border-style:solid"></i><span>Park Boundary</span><br>';
  return div;
};
LegendEquity.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Equity/Opportunity<br>Index Categories 2020</h4>";
  div.innerHTML += '<i style="background: #000000"></i><span>HI (high and very high)</span><br>';
  div.innerHTML += '<i style="background: #808080"></i><span>MOD (moderate)</span><br>';
  div.innerHTML += '<i style="border-color:#bebebe; border-width:2; border-style:solid"></i><span>LO (low and very low)</span><br>';
  div.innerHTML += '<i style="border-color:#ff0000; border-width:2; border-style:solid"></i><span>Park Boundary</span><br>';
  return div;
};
LegendSatellite.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Satellite View, current</h4>";
  div.innerHTML += '<i style="border-color:#ff0000; border-width:2; border-style:solid"></i><span>Park Boundary</span><br>';
  return div;
};

LegendTreeCanopy.addTo(map);

// Swap legends based on the selected map layer
map.on('baselayerchange', function(eventLayer) {
  console.log("clicked on base layer: " + eventLayer.name);
  if (eventLayer.name === 'Tree Canopy Cover') {
    LegendTreeCanopy.addTo(map);
    map.removeControl(info);
    map.removeControl(LegendNDVI);
    map.removeControl(LegendEquity);
    map.removeControl(LegendSatellite);
    info.addTo(map);
  }
  if (eventLayer.name === 'NDVI (zoom in to see)') {
    LegendNDVI.addTo(map);
    map.removeControl(info);
    map.removeControl(LegendTreeCanopy);
    map.removeControl(LegendEquity);
    map.removeControl(LegendSatellite);
    info.addTo(map);
  }
  if (eventLayer.name === 'Equity/Opportunity Index') {
    LegendEquity.addTo(map);
    map.removeControl(info);
    map.removeControl(LegendNDVI);
    map.removeControl(LegendTreeCanopy);
    map.removeControl(LegendSatellite);
    info.addTo(map);
  }
  if (eventLayer.name === 'Satellite View') {
    LegendSatellite.addTo(map);
    map.removeControl(info);
    map.removeControl(LegendTreeCanopy);
    map.removeControl(LegendNDVI);
    map.removeControl(LegendEquity);
    info.addTo(map);
  }
});

// Following code will add an interactive parks layer from js file
//style the parks layer
function style(feature) {
    return {
        fillColor: '#ffffff00',
        weight: 2,
        opacity: 1,
        color: '#ff0000',
        fillOpacity: 0
    };
}
// event listner for mouse over
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
}
// ...and mouse out
function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}


// click listener that zooms to a park
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
// put it together
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}
//get the actual park data and put in on the map
geojson = L.geoJson(parks, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

//Create a custom control to put data in a box in the corner. Several steps:
var info = L.control({
  position: 'topright'
});

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Park Data</h4>' +  (props ?
        '<b>' + props.Name + '</b><br/>Size: ' + Math.round((props.Shape_Area)/43560) + ' acres<br/>Tree Canopy: ' + Math.round((props.TreeCanopy_Percent)*100) + '%'
        : 'Hover over a park for details.<br>Click on a park to zoom in.');
};

info.addTo(map);
