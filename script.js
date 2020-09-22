const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

let productData = [];
fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    data = response;
  });

let burgers = [];
let tacos = [];
let salads = [];
let drinks = [];

let menuItems = document.getElementById("menu-items");
