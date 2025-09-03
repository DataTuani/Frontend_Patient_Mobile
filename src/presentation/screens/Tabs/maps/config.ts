const hospitals = [
  { name: "Hospital Militar Escuela", lat: 12.1456, lng: -86.2674 },
  { name: "Hospital Bautista", lat: 12.14188, lng: -86.26269 },
  { name: "Hospital Central Kuhl", lat: 12.11611, lng: -86.25096 },
  { name: "Hospital Salud Integral", lat: 12.149022, lng: -86.287109 },
  { name: "Hospital Antonio Lenín Fonseca", lat: 12.1492, lng: -86.3110 }
];

const points = [
  { name: "Jornada de Vacunación XYZ", lat: 12.1300, lng: -86.2600 },
  // ...
];

export const leafletHTML = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>Mapa Hospitales</title>
<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
<style>
  #map { height:100vh; width:100vw; }
</style>
</head>
<body>
<div id="map"></div>
<script>
  var map = L.map('map').setView([12.1364, -86.2514], 7);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    maxZoom:19
  }).addTo(map);

  var items = ${JSON.stringify([...hospitals, ...points])};

  items.forEach(p => {
    L.marker([p.lat, p.lng]).addTo(map)
     .bindPopup(p.name);
  });
</script>
</body>
</html>
`;