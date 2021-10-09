// Selector
const listProduct = document.querySelector("#products-list");
const listCart = document.querySelector("#shopping-cart");
const showNum = document.querySelector("#cart-number");
let productsLS = localStorage.getItem("products");
productsLS = JSON.parse(productsLS);

const url = "https://5fa3d0d9f10026001618df85.mockapi.io/products";

const getResponse = (response) => response.json();

const renderData = (data) => {
  const html = data.map((item) => {
    return `
      <div class="product">
        <div class="product-img">
          <a href="#" class="product-link">
            <img
              src="${item.image}"
              alt=""
            />
          </a>
          <div class="add-cart number-${item.id}">Add to cart</div>
        </div>
        <div class="product-content">
          <div class="title">${item.name}</div>
          <div class="bottom">
            <div class="price">$${item.price}</div>
            <div class="quantity">Đã bán 2k</div>
          </div>
        </div>
      </div>
    `;
  });
  listProduct.innerHTML = html.join("");
  // =====================================
  const addCart = document.querySelectorAll(".add-cart");
  addCart.forEach((element, index) => {
    addCart[index].addEventListener("click", () => {
      addToCart(data[index]);
      loadNumber();
    });
  });
  const addToCart = (product) => {
    addLocalStorage(product);
    renderCart();
  };
};

const renderCart = () => {
  if (productsLS) {
    const htmlCart = Object.values(productsLS).map((item) => {
      return `
        <div class="box">
          <i class="fas fa-trash"></i>
          <img
            src="${item.image}"
            alt=""
          />
          <div class="content">
            <h3>${item.name}</h3>
            <div class="price">$${item.price}</div>
            <input
              type="number"
              class="input-count"
              id="count"
              min="1"
              max="100"
              value="1"
            />
          </div>
        </div>
      `;
    });
    listCart.innerHTML = htmlCart.join("");
  }
};

const addLocalStorage = (product) => {
  if (productsLS) {
    if (!productsLS[product.id]) {
      productsLS = {
        ...productsLS,
        [product.id]: product,
      };
    }
  } else {
    productsLS = {
      [product.id]: product,
    };
  }
  localStorage.setItem("products", JSON.stringify(productsLS));
};

const onLoadNumber = () => {
  let numberCart = localStorage.getItem("numberCart");
  numberCart = +numberCart;
  if (numberCart) {
    showNum.textContent = numberCart;
  }
};

const loadNumber = () => {
  let numberCart = localStorage.getItem("numberCart");
  numberCart = +numberCart;
  if (numberCart) {
    localStorage.setItem("numberCart", numberCart + 1);
    showNum.textContent = numberCart + 1;
  } else {
    localStorage.setItem("numberCart", 1);
    showNum.textContent = 1;
  }
};

// GET
fetch(url).then(getResponse).then(renderData);
