import React from 'react';
import { WebView } from 'react-native-webview';

const MapComponent = ({ region, cepLocation, restaurants }) => {
  const generateHtml = () => {
    const restaurantMarkers = restaurants.map(
      (restaurant, index) => `
        var marker${index} = new ol.Overlay({
          position: ol.proj.fromLonLat([${restaurant.longitude}, ${restaurant.latitude}]),
          positioning: 'center-center',
          element: document.createElement('div'),
          stopEvent: false
        });
        marker${index}.getElement().style.width = '20px';
        marker${index}.getElement().style.height = '20px';
        marker${index}.getElement().style.background = 'green';
        marker${index}.getElement().style.borderRadius = '50%';
        map.addOverlay(marker${index});
      `
    ).join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
          <title>OpenLayers Map</title>
          <style>
              #map {
                  width: 100%;
                  height: 100%;
              }
          </style>
          <link rel="stylesheet" href="https://openlayers.org/en/v6.14.1/css/ol.css" type="text/css">
          <script src="https://openlayers.org/en/v6.14.1/build/ol.js"></script>
      </head>
      <body>
          <div id="map" class="map"></div>
          <script type="text/javascript">
              var map = new ol.Map({
                  target: 'map',
                  layers: [
                      new ol.layer.Tile({
                          source: new ol.source.OSM()
                      })
                  ],
                  view: new ol.View({
                      center: ol.proj.fromLonLat([${region.longitude}, ${region.latitude}]),
                      zoom: 12
                  })
              });

              var currentLocationMarker = new ol.Overlay({
                  position: ol.proj.fromLonLat([${region.longitude}, ${region.latitude}]),
                  positioning: 'center-center',
                  element: document.createElement('div'),
                  stopEvent: false
              });
              currentLocationMarker.getElement().style.width = '20px';
              currentLocationMarker.getElement().style.height = '20px';
              currentLocationMarker.getElement().style.background = 'blue';
              currentLocationMarker.getElement().style.borderRadius = '50%';
              map.addOverlay(currentLocationMarker);

              var cepLocationMarker = new ol.Overlay({
                  position: ol.proj.fromLonLat([${cepLocation.longitude}, ${cepLocation.latitude}]),
                  positioning: 'center-center',
                  element: document.createElement('div'),
                  stopEvent: false
              });
              cepLocationMarker.getElement().style.width = '20px';
              cepLocationMarker.getElement().style.height = '20px';
              cepLocationMarker.getElement().style.background = 'red';
              cepLocationMarker.getElement().style.borderRadius = '50%';
              map.addOverlay(cepLocationMarker);

              ${restaurantMarkers}
          </script>
      </body>
      </html>
    `;
  };

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: generateHtml() }}
      style={{ flex: 1 }}
    />
  );
};

export default MapComponent;
