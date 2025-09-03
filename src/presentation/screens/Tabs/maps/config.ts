
type Hospital = {
    name: string;
    lat: number;
    lng: number;
    address?: string;
    phone?: string;
    specialty?: string;
};

const hospitals: Hospital[] = [
    {
        name: "Hospital Militar Escuela",
        lat: 12.1456,
        lng: -86.2674,
        address: "Km 7.5 Carretera Norte, Managua",
        phone: "2250-1234",
        specialty: "General"
    },
    {
        name: "Hospital Bautista",
        lat: 12.14188,
        lng: -86.26269,
        address: "Av. Roosevelt, Managua",
        phone: "2260-5678",
        specialty: "Pediatría"
    },
    {
        name: "Hospital Central Kuhl",
        lat: 12.11611,
        lng: -86.25096,
        address: "Sector Centro, Managua",
        phone: "2270-1111",
        specialty: "Urgencias"
    }
];

const points: Hospital[] = [
    {
        name: "Jornada de Vacunación XYZ",
        lat: 12.1300,
        lng: -86.2600,
        address: "Parque Central, Managua",
        phone: "N/A",
        specialty: "Vacunación"
    }
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
  html, body { margin:0; padding:0; height:100%; width:100%; }
  #map { height:100%; width:100%; }

  #searchContainer {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    width: 80%;
  }
  #searchInput {
    width: 100%;
    padding: 8px;
    font-size: 2vh;
    border-radius: 4px;
    border: 1px solid #ccc;
    height: 8vh;
  }
  #suggestions {
    border: 1px solid #ccc;
    border-top: none;
    max-height: 150px;
    overflow-y: auto;
    background: white;
  }
  #suggestions div {
    padding: 6px 8px;
    cursor: pointer;
  }
  #suggestions div:hover {
    background-color: #eee;
  }

  /* Panel inferior de información */
  #infoPanel {
    position: absolute;
    bottom: -50%; /* fuera de pantalla inicialmente */
    left: 0;
    width: 100%;
    height: 50%;
    background: white;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    box-shadow: 0 -2px 8px rgba(0,0,0,0.3);
    padding: 16px;
    z-index: 1001;
    transition: bottom 0.3s;
    overflow-y: auto;
  }
  #infoPanel.show {
    bottom: 0; /* aparece */
  }
  #infoPanelClose {
    position: absolute;
    top: 8px;
    right: 12px;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
  }
</style>
</head>
<body>
<div id="searchContainer">
  <input id="searchInput" placeholder="Buscar hospital o vacunación..." autocomplete="off"/>
  <div id="suggestions"></div>
</div>

<div id="map"></div>

<div id="infoPanel">
  <div id="infoPanelClose">×</div>
  <div id="infoContent"></div>
</div>

<script>
  var map = L.map('map').setView([12.1364, -86.2514], 12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{ maxZoom:19 }).addTo(map);

  var items = ${JSON.stringify([...hospitals, ...points])};
  var markers = [];
  var infoPanel = document.getElementById('infoPanel');
  var infoContent = document.getElementById('infoContent');
  var closeBtn = document.getElementById('infoPanelClose');

  function showInfo(data){
    infoContent.innerHTML = '<h2>' + data.name + '</h2>' +
                            (data.specialty ? '<b>Especialidad:</b> ' + data.specialty + '<br/>' : '') +
                            (data.address ? '<b>Dirección:</b> ' + data.address + '<br/>' : '') +
                            (data.phone ? '<b>Teléfono:</b> ' + data.phone : '');
    infoPanel.classList.add('show');
  }

  closeBtn.onclick = function(){
    infoPanel.classList.remove('show');
  }

  items.forEach(function(p) {
    var marker = L.marker([p.lat, p.lng]).addTo(map);
    marker.options.title = p.name.toLowerCase();
    marker.on('click', function(){
      showInfo(p);
    });
    markers.push(marker);
  });

  var input = document.getElementById('searchInput');
  var suggestionsContainer = document.getElementById('suggestions');

  function updateSuggestions(query) {
    suggestionsContainer.innerHTML = '';
    if(query === '') return;
    var matches = items.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
    matches.forEach(function(match){
      var div = document.createElement('div');
      div.textContent = match.name;
div.onclick = function() {
  input.value = match.name;
  suggestionsContainer.innerHTML = '';
  var marker = markers.find(m => m.options.title === match.name.toLowerCase());
  if(marker){
    // map.setView(marker.getLatLng(), 16);  <-- ELIMINA esta línea
    showInfo(match); // Mostrar panel inferior
  }
};
      suggestionsContainer.appendChild(div);
    });
  }

  input.addEventListener('input', function() {
    updateSuggestions(this.value);
  });
</script>
</body>
</html>
`;
