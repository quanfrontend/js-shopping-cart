const listProduct = document.querySelector("#products-list");
const listProductCart = document.querySelector("#shopping-cart");
let cartNumber = document.querySelector("#cart-number");
let totalNumber = document.querySelector("#total");
const productsCart = [];

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
        <div class="add-cart" id="add-cart">Add to cart</div>
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
  listProduct.innerHTML = htmls.join("");
  return products;
};
const renderProductsCart = () => {
  let htmls = productsCart.map((productCart, index) => {
    return `
    <div class="box">
      <i class="fas fa-trash" data-id="${index}"></i>
      <img
        src="${productCart.image}"
        alt=""
      />
      <div class="content">
        <h3>${productCart.name}</h3>
        <div class="price">$${productCart.price}</div>
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
  listProductCart.innerHTML = htmls.join("");
};
const count = () => {
  cartNumber.textContent = productsCart.length;
};
const total = () => {
  let totalPrice = productsCart.reduce((sum, num) => {
    return sum + +num.price;
  }, 0);
  totalNumber.textContent = totalPrice;
};
const url = "https://5fa3d0d9f10026001618df85.mockapi.io/products";
// Method: GET
fetch(url)
  .then((res) => res.json())
  .then((data) => renderProducts(data))
  .then((products) => addToCart(products))
  .catch((err) => console.log(err));

// Function
function addToCart(products) {
  const btnAdd = document.querySelectorAll(".add-cart");
  btnAdd.forEach((element, index) => {
    btnAdd[index].addEventListener("click", () => {
      productsCart.push(products[index]);
      renderProductsCart();
      count();
      total();
    });
  });
}
function deletePro() {
  listProductCart.addEventListener("click", (e) => {
    let id = +e.target.dataset.id;
    if (id >= 0) {
      productsCart.splice(id, 1);
      console.log(productsCart);
      renderProductsCart();
      count();
      total();
    }
  });
}
deletePro();
