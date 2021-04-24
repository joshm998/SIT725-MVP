function checkAuthenticated() {
  fetch('http://localhost:8080/user').then((response) => {
    if (response.redirected) {
      window.location.href = response.url;
    }
    console.log(response);
  });
}

checkAuthenticated();
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("devicelat").value = -37.8136;
  document.getElementById("devicelng").value = 144.9631;
  var locationMap = L.map('location-map').setView([-37.8136, 144.9631], 9);
  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(locationMap);
  var marker;
  locationMap.on('click', function (e) {
    if (marker) locationMap.removeLayer(marker);
    document.getElementById("devicelat").value = e.latlng.lat;
    document.getElementById("devicelng").value = e.latlng.lng;
    marker = L.marker(e.latlng).addTo(locationMap);
  });
});
