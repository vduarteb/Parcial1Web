const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

let productData = [];
fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    productData = response;
    let burgersData = [];
    let tacosData = [];
    let saladsData = [];
    let dessertsData = [];
    let drinksData = [];

    let menuItems = document.getElementById("menu-items");

    for (let i = 0; i < productData.length; i++) {
      let product = productData[i];
      if (product.name === "Burguers") {
        burgersData = product;
      } else if (product.name === "Tacos") {
        tacosData = product;
      } else if (product.name === "Salads") {
        saladsData = product;
      } else if (product.name === "Desserts") {
        dessertsData = product;
      } else if (product.name === "Drinks and Sides") {
        drinksData = product;
      }
    }

    document.getElementById("burgers").addEventListener("click", (event) => {
      document.getElementById("menu-items").innerHTML = "";
      document.getElementById("item-title").textContent = burgersData.name;
      createMenuItems(burgersData.products);
    });

    document.getElementById("tacos").addEventListener("click", (event) => {
      document.getElementById("menu-items").innerHTML = "";
      document.getElementById("item-title").textContent = tacosData.name;
      createMenuItems(tacosData.products);
    });

    document.getElementById("salads").addEventListener("click", (event) => {
      document.getElementById("menu-items").innerHTML = "";
      document.getElementById("item-title").textContent = saladsData.name;
      createMenuItems(saladsData.products);
    });
    document.getElementById("desserts").addEventListener("click", (event) => {
      document.getElementById("menu-items").innerHTML = "";
      document.getElementById("item-title").textContent = dessertsData.name;
      createMenuItems(dessertsData.products);
    });
    document.getElementById("drinks").addEventListener("click", (event) => {
      document.getElementById("menu-items").innerHTML = "";
      document.getElementById("item-title").textContent = drinksData.name;
      createMenuItems(drinksData.products);
    });

    function createMenuItems(products) {
      let div = document.createElement("div");
      div.className = "row ml-4 mr-4 mt-2 mb-2";
      for (let i = 0; i < products.length; i++) {
        let div1 = document.createElement("div");
        div1.className +=
          "col-lg-3 col-md-4 col-sm-6 d-flex align-items-stretch justify-content-center mt-4";
        let div2 = document.createElement("div");
        div2.className = "card";
        div2.style.width = "20rem";
        div2.innerHTML = `<img class="card-img-top card-image mx-auto d-block w-100" src="${products[i].image}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${products[i].name}</h5>
          <p class="card-text">${products[i].description}</p>
          <a href="#" class="btn btn-dark">Add to cart</a>
        </div>`;

        div1.appendChild(div2);
        div.appendChild(div1);

        document.getElementById("menu-items").appendChild(div);
      }
    }
  });
