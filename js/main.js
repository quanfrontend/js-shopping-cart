/**
 * Các chức năng:
 * Hiển thị sản phẩm--ok
 * Hiển thị số lượng sản phẩm thêm vào giỏ hàng--ok
 * Hiển thị sản phẩm trong giỏ hàng--ok
 * Hiển thị tổng số tiền sản phẩm trong giỏ hàng--ok
 * Xóa sản phẩm trong giỏ hàng/cập nhật số lượng sản phẩm trong giỏ--ok
 * Tăng giảm số lượng sản phẩm trong giỏ/cập nhật số lượng sản phẩm trong giỏ--ok
 */
// Sử dụng async await
const callApi = async () => {
  const url = "https://5fa3d0d9f10026001618df85.mockapi.io/products";
  let response = await fetch(url);
  let data = await response.json();
  let datas = data.map((item) => {
    return Object.assign(item, { inCart: 0 });
  });
  // render products
  let productsCart = [];
  const listProducts = document.querySelector("#products-list");
  const listCart = document.querySelector("#shopping-cart");
  const renderProducts = (datas) => {
    let htmls = data.map((product) => {
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
  };
  renderProducts(datas);
  // render cart
  const renderCart = (data) => {
    let htmls = data.map((product) => {
      return `
      <div class="box item-${product.id}" data-id=${product.id}>
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
            data-id="${product.id}"
            min="1"
            max="100"
            value="${product.inCart}"
          />
        </div>
      </div>
      `;
    });
    listCart.innerHTML = htmls.join("");
  };
  // Handle Add
  const btnAdd = document.querySelectorAll(".add-cart");
  btnAdd.forEach((element, index) => {
    element.addEventListener("click", () => {
      onAddCart(datas[index]);
    });
  });
  function onAddCart(product) {
    const value = productsCart.findIndex((item) => item.id === product.id);
    if (value < 0) {
      product.inCart = 1;
      productsCart.push(product);
    } else {
      productsCart[value].inCart = +productsCart[value].inCart + 1;
    }
    renderCart(productsCart);
    onNumberCart(productsCart);
    onTotalPrice(productsCart);
    saveLocalStorage(productsCart);
    const btnDel = document.querySelectorAll(".fa-trash");
    const input = document.querySelectorAll(".input-count");
    onDeleteCart(btnDel);
    onPlusMinus(input);
  }
  // Handle Total Price
  function onTotalPrice(productsCart) {
    const totalPrice = document.querySelector("#total");
    let total = productsCart.reduce((sum, num) => {
      return sum + +(num.price * num.inCart);
    }, 0);
    totalPrice.textContent = total;
  }
  // Handle Delete
  function onDeleteCart(btnDel) {
    btnDel.forEach((element) => {
      element.addEventListener("click", (e) => {
        let id = e.target.parentElement.dataset.id;
        let locationId = productsCart.findIndex((item) => item.id === id);
        productsCart.splice(locationId, 1);
        const itemCart = document.querySelector(".item-" + id);
        if (itemCart) {
          itemCart.remove();
        }
        onNumberCart(productsCart);
        onTotalPrice(productsCart);
        saveLocalStorage(productsCart);
      });
    });
  }
  // Handle Show Number
  const numberCart = document.querySelector("#cart-number");
  function onNumberCart(productsCart) {
    let number = productsCart.reduce((sum, num) => {
      return sum + +num.inCart;
    }, 0);
    numberCart.textContent = number;
  }
  // Handle Plus Minus
  function onPlusMinus(input) {
    input.forEach((element) => {
      element.addEventListener("change", (e) => {
        let id = e.target.dataset.id;
        let quantity = element.value;
        let pro = productsCart.find((item) => item.id === id);
        if (pro) {
          pro.inCart = quantity;
        }
        onNumberCart(productsCart);
        onTotalPrice(productsCart);
        saveLocalStorage(productsCart);
      });
    });
  }
  // Handel save localstorage
  function saveLocalStorage(productsCart) {
    localStorage.setItem("products", JSON.stringify(productsCart));
  }
  // Handle page load
  function onPageLoad() {
    let getLocalStorage = localStorage.getItem("products");
    getLocalStorage = JSON.parse(getLocalStorage);
    if (getLocalStorage) {
      productsCart = getLocalStorage;
      renderCart(productsCart);
      onNumberCart(productsCart);
      onTotalPrice(productsCart);
      const btnDel = document.querySelectorAll(".fa-trash");
      const input = document.querySelectorAll(".input-count");
      onPlusMinus(input);
      onDeleteCart(btnDel);
    }
  }
  onPageLoad();
};
callApi();
