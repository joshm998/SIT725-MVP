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
});
