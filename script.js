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
    let carrito = [];

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

    createMenuItems(burgersData.products);

    document.getElementById("burgers").addEventListener("click", (event) => {
      menuItems.innerHTML = "";
      document.getElementById("item-title").textContent = burgersData.name;
      createMenuItems(burgersData.products);
    });

    document.getElementById("tacos").addEventListener("click", (event) => {
      menuItems.innerHTML = "";
      document.getElementById("item-title").textContent = tacosData.name;
      createMenuItems(tacosData.products);
    });

    document.getElementById("salads").addEventListener("click", (event) => {
      menuItems.innerHTML = "";
      document.getElementById("item-title").textContent = saladsData.name;
      createMenuItems(saladsData.products);
    });
    document.getElementById("desserts").addEventListener("click", (event) => {
      menuItems.innerHTML = "";
      document.getElementById("item-title").textContent = dessertsData.name;
      createMenuItems(dessertsData.products);
    });
    document.getElementById("drinks").addEventListener("click", (event) => {
      menuItems.innerHTML = "";
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
          <p class="card-text"><b>$${products[i].price}</b></p>
        </div>`;

        let btn = document.createElement("a");
        btn.innerHTML = `<a class="btn btn-dark ml-4 mb-4">Add to cart</a>`;
        div2.appendChild(btn);
        div1.appendChild(div2);
        div.appendChild(div1);

        menuItems.appendChild(div);

        btn.addEventListener("click", (event) => {
          addToCart(products[i]);
        });
      }
    }

    function addToCart(product) {
      carrito.push(product);
      changeCartQuantity();
    }

    function changeCartQuantity() {
      let quantity = document.getElementById("cart-quantity");

      if (carrito.length === 0) {
        quantity.textContent = "";
      } else if (carrito.length === 1) {
        quantity.textContent = carrito.length + " item";
      } else {
        quantity.textContent = carrito.length + " items";
      }
    }

    document
      .getElementById("cart-notification")
      .addEventListener("click", (event) => {
        menuItems.innerHTML = "";
        document.getElementById("item-title").textContent = "Order Detail";
        showOrderDetail();
      });

    function showOrderDetail() {
      let orderItems = getOrderItems();
      let div = document.createElement("div");
      let table = document.createElement("table");
      table.className = "table table-striped";
      table.innerHTML = `<thead>
        <tr>
          <th scope="col">Item</th>
          <th scope="col">Qty.</th>
          <th scope="col">Description</th>
          <th scope="col">Unit Price</th>
          <th scope="col">Amount</th>
        </tr>
      </thead>`;
      let tableBody = document.createElement("tbody");
      for (let i = 0; i < orderItems.length; i++) {
        let row = document.createElement("tr");
        row.innerHTML = `<th scope="row">${orderItems[i].item}</th>
          <td>${orderItems[i].quantity}</td>
          <td>${orderItems[i].description}</td>
          <td>${orderItems[i].unitPrice}</td>
          <td>${orderItems[i].amount}</td>`;
        tableBody.appendChild(row);
      }

      table.appendChild(tableBody);
      div.appendChild(table);
      menuItems.appendChild(div);
    }

    function getOrderItems() {
      let added = []; //Tipo producto
      let orderItems = []; //Tipo product 2.0
      let product = null;
      let num = 0;
      for (let i = 0; i < carrito.length; i++) {
        if (!added.includes(carrito[i])) {
          num++;
          let qty = 1;
          let uPrice = carrito[i].price;
          product = {
            item: num,
            quantity: qty,
            description: carrito[i].name,
            unitPrice: uPrice,
            amount: qty * uPrice,
          };
          added.push(carrito[i]);
          orderItems.push(product);
        } else {
          for (let j = 0; j < orderItems.length; j++) {
            if (orderItems[j].description === carrito[i].name) {
              orderItems[j].quantity += 1;
              orderItems[j].amount =
                orderItems[j].quantity * orderItems[j].unitPrice;
              break;
            }
          }
        }
      }
      console.log(orderItems);
      return orderItems;
    }
  });
