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
      });
    });
}

checkAuthenticated();
document.addEventListener('DOMContentLoaded', function () {
  populateDevices();
});
