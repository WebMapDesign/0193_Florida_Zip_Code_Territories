let map = L.map("map", {
}).setView([26.5606,-81.3376], 9);

let layerTilesOSM = new L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors</a>',
  }
).addTo(map);

let popupStyle = {
  closeButton: true,
};

const colorsTerritories = {
  1: "#ffcc00",
  2: "#ff99ff",
  3: "#fff200"
};

function styleZipCodes(feature) {
  return {
    color: "#000000",
    fillColor: colorsTerritories[feature.properties.territory],
    fillOpacity: 0.6,
    opacity: 1,
    weight: 0.5,
  };
}

function highlightFeature(e) {
  e.target.setStyle({
    color: "#000000",
    fillColor: "#222222",
    fillOpacity: 0.5,
    opacity: 1,
    weight: 0.5,
  });
}

let layerZipCodes;

function resetHighlightZipCodes(e) {
  layerZipCodes.resetStyle(e.target);
}

function onEachFeatureZipCodes(feature, layer) {
  let tooltipContent = feature.properties.ZCTA5CE20;
  layer.bindTooltip(tooltipContent, {
    permanent: true,
    direction: "center",
    className: "tooltip-style",
  });

  let popupContent =
    '<p class="popup-title">' + feature.properties.ZCTA5CE20 + "</p>";

  layer.bindPopup(popupContent, popupStyle);
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlightZipCodes,
  });
}

layerZipCodes = L.geoJSON(geojsonZipCodes, {
  style: styleZipCodes,
  onEachFeature: onEachFeatureZipCodes,
}).addTo(map);


let legendAreas = L.control({ position: "bottomleft" });

legendAreas.onAdd = function (map) {
  let div = L.DomUtil.create("div", "info legend legend-territories");

  div.innerHTML = "";

  for (const territory in colorsTerritories) {
    div.innerHTML += `<i style="background: ${colorsTerritories[territory]}"></i>Territory ${territory}<br>`;
  }

  return div;
};

legendAreas.addTo(map);