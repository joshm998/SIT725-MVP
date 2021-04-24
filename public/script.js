function checkAuthenticated() {
  fetch('http://localhost:8080/user').then((response) => {
    if (response.redirected) {
      window.location.href = response.url;
    }
    console.log(response);
  });
}

function populateDevices() {
  fetch('http://localhost:8080/api/devices')
    .then((response) => response.json())
    .then((data) => {
      var locationMap = L.map('location-map').setView([0, 0], 13);
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(locationMap);

      deviceLocations = [];

      data.devices.forEach((e) => {
        var element = document.createElement('div');
        element.setAttribute('class', 'card medium event-card');

        //Create Card Image Element
        var imageDiv = document.createElement('div');
        imageDiv.setAttribute('class', 'card-image');
        var image = document.createElement('img');
        image.setAttribute('src', e.image);
        image.setAttribute('alt', 'banner');
        imageDiv.append(image);
        element.append(imageDiv);

        //Create Card Content
        var cardContent = document.createElement('div');
        cardContent.setAttribute('class', 'card-content');
        var cardTitle = document.createElement('div');
        cardTitle.setAttribute('class', 'card-title');
        cardTitle.append(document.createTextNode(e.name));
        var leftContent = document.createElement('div');
        leftContent.setAttribute('class', 'left');
        var p = document.createElement('p');
        p.append(document.createTextNode(e.deviceType));
        leftContent.append(p);
        p = document.createElement('p');
        p.append();
        a = document.createElement('a');
        a.setAttribute('href', `/devices/details?id=${e._id}`);
        a.append(document.createTextNode('View Details'));
        p.append(a);
        leftContent.append(p);

        cardContent.append(cardTitle);
        cardContent.append(leftContent);

        element.append(cardContent);

        //Append Element to Devices List
        var deviceList = document.getElementsByClassName('devices')[0];
        deviceList.append(element);

        //Append Item to Map
        var marker = L.marker([e.lat, e.lng]).addTo(locationMap);
        marker.bindPopup(
          `<b>${e.name}</b><br/>${e.deviceType}<br/>No Issues<br/><a href="/devices/details?id=${e._id}">View Details</a>`
        );
        deviceLocations.push([e.lat, e.lng]);
      });
      var bounds = new L.LatLngBounds(deviceLocations);
      locationMap.fitBounds(bounds);
    });
}

checkAuthenticated();
document.addEventListener('DOMContentLoaded', function () {
  populateDevices();
});
