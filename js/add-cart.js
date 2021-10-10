// Sử dụng fetch để call api và sử dụng localstorage để lưu dữ liệu
const listProducts = document.querySelector("#products-list");
const listProductsCart = document.querySelector("#shopping-cart");
const url = "https://5fa3d0d9f10026001618df85.mockapi.io/products";
let productsCart = [];
let productsLocal = localStorage.getItem("products");
productsLocal = JSON.parse(productsLocal);

const renderProducts = (products) => {
  let htmls = products.map((product) => {
    return `
    <div class="product">
      <div class="product-img">
        <a href="#" class="product-link">
          <img
            src="${product.image}"
            alt=""
          />
        </a>
        <div class="add-cart">Add to cart</div>
      </div>
      <div class="product-content">
        <div class="title">${product.name}</div>
        <div class="bottom">
          <div class="price">$${product.price}</div>
          <div class="quantity">Đã bán 2k</div>
        </div>
      </div>
    </div>
    `;
  });
  listProducts.innerHTML = htmls.join("");
  return products;
};
const renderProductsCart = () => {
  let htmls = productsCart.map((product) => {
    return `
    <div class="box">
      <i class="fas fa-trash"></i>
      <img
        src="${product.image}"
        alt=""
      />
      <div class="content">
        <h3>${product.name}</h3>
        <div class="price">$${product.price}</div>
        <input
          type="number"
          class="input-count"
          id="count"
          min="1"
          max="1"
          value="1"
        />
      </div>
    </div>
    `;
  });
  listProductsCart.innerHTML = htmls.join("");
};
const postLocal = (product) => {
  if (productsLocal) {
    if (!productsLocal[product.id]) {
      productsLocal = {
        ...productsLocal,
        [product.id]: product,
      };
    }
  } else {
    productsLocal = {
      [product.id]: product,
    };
  }
  localStorage.setItem("products", JSON.stringify(productsLocal));
};
const savePro = () => {
  if (productsLocal) {
    productsCart = productsLocal;
  }
};

// Method: GET
fetch(url)
  .then((res) => res.json())
  .then((data) => renderProducts(data))
  .then((data) => addToCart(data))
  .catch((err) => console.log(err));

// Function
function addToCart(products) {
  const addCart = document.querySelectorAll(".add-cart");
  addCart.forEach((element, index) => {
    addCart[index].addEventListener("click", () => {
      productsCart.push(products[index]);
      renderProductsCart();
      postLocal(products[index]);
    });
  });
}
savePro();
