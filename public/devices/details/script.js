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
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  fetch(`http://localhost:8080/api/devices/details?id=${id}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.result[0] != null) {
        details = data.result[0];
        console.log(data.result[0]);
        document.getElementsByClassName("title")[0].innerText = details.name
        var locationMap = L.map('location-map').setView([details.lat, details.lng], 13);
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(locationMap);
        var marker = L.marker([details.lat, details.lng]).addTo(locationMap);
        marker.bindPopup("<b>Device Location</b><br>Device was last reported here.").openPopup();

      }
      
    });
});
