// Mảng sản phẩm
const products = [
  {
    id: 0,
    url: "https://images.unsplash.com/photo-1560155016-bd4879ae8f21?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=464&q=80",
    name: "Avocado",
    price: 5,
    inCart: 0,
  },
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1560155016-bd4879ae8f21?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=464&q=80",
    name: "Mangoes",
    price: 3,
    inCart: 0,
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1560155016-bd4879ae8f21?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=464&q=80",
    name: "Banana",
    price: 2,
    inCart: 0,
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1560155016-bd4879ae8f21?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=464&q=80",
    name: "Strawberry",
    price: 6,
    inCart: 0,
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1560155016-bd4879ae8f21?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=464&q=80",
    name: "Orange",
    price: 4,
    inCart: 0,
  },
];
// Mảng giỏ hàng
const productsCart = [];
// Query
const listProducts = document.querySelector("#products-list");
const listProductsCart = document.querySelector("#shopping-cart");
const total = document.querySelector("#total");
const numberCart = document.querySelector("#cart-number");
const checkout = document.querySelector(".checkout");
let productsLocalStorage = localStorage.getItem("products");
productsLocalStorage = JSON.parse(productsLocalStorage);
// render danh sách sản phẩm
const renderProducts = () => {
  let renderPro = products.map((product) => {
    return `
      <div class="product">
        <div class="product-img">
          <a href="#" class="product-link">
            <img src="${product.url}" alt="" />
          </a>
          <div class="add-cart">Add to cart</div>
        </div>
        <div class="product-content">
          <div class="title">${product.name}</div>
          <div class="bottom">
            <div class="price">$${product.price}.00</div>
            <div class="quantity">Đã bán 2k</div>
          </div>
        </div>
      </div>
    `;
  });
  return (listProducts.innerHTML = renderPro.join(""));
};
renderProducts();
// render danh sách sản phẩm trong giỏ hàng
const renderProductsCart = () => {
  let productsLocalStorage = localStorage.getItem("products");
  productsLocalStorage = JSON.parse(productsLocalStorage);
  if (productsLocalStorage && listProductsCart) {
    let render = Object.values(productsLocalStorage).map(
      (productCart, index) => {
        return `
      <div class="box">
        <i class="fas fa-trash" data-id="${index}"></i>
        <img src="${productCart.url}" alt="" />
        <div class="content">
          <h3>${productCart.name}</h3>
          <div class="price">$${productCart.price}.00</div>
          <input
                type="number"
                class="input-count"
                id="count"
                min="1"
                max="100"
                value="${productCart.inCart}"
              />
        </div>
      </div>
    `;
      }
    );
    return (listProductsCart.innerHTML = render.join(""));
  }
};
//  Sử dụng localstorage =========================================
// Lưu sản phẩm
const saveLocalStorage = (itemProduct) => {
  if (productsLocalStorage) {
    if (!productsLocalStorage[itemProduct.id]) {
      productsLocalStorage = {
        ...productsLocalStorage,
        [itemProduct.id]: itemProduct,
      };
    }
    productsLocalStorage[itemProduct.id].inCart += 1;
  } else {
    itemProduct.inCart = 1;
    productsLocalStorage = {
      [itemProduct.id]: itemProduct,
    };
  }
  localStorage.setItem("products", JSON.stringify(productsLocalStorage));
};
// Lưu số lượng sản phẩm
const cartNumber = () => {
  if (productsLocalStorage) {
    let getNum = Object.values(productsLocalStorage).reduce((sum, num) => {
      return sum + num.inCart;
    }, 0);
    localStorage.setItem("cartNumber", getNum);
    numberCart.textContent = getNum;
  }
};
// Lưu tổng số tiền
const totalPrice = () => {
  if (productsLocalStorage) {
    let getPrice = Object.values(productsLocalStorage).reduce((sum, num) => {
      return sum + num.price * num.inCart;
    }, 0);
    localStorage.setItem("total", getPrice);
    total.textContent = getPrice;
  }
};
// Tăng giảm số lượng
const plusMinus = (itemProduct) => {
  let input = document.querySelectorAll(".input-count");
  input.forEach((element, index) => {
    element.addEventListener("change", () => {
      if (productsLocalStorage) {
        productsLocalStorage[index].inCart = +element.value;
      }
      localStorage.setItem("products", JSON.stringify(productsLocalStorage));
      cartNumber();
      totalPrice();
    });
  });
};
// ====================================================================
// Click thêm sản phẩm vào giỏ
const btnAdd = document.querySelectorAll(".add-cart");
btnAdd.forEach((element, index) => {
  element.addEventListener("click", () => {
    onAddCart(products[index]);
  });
});
const onAddCart = (itemProduct) => {
  // Save localstorage
  saveLocalStorage(itemProduct);
  // render sản phẩm
  renderProductsCart();
  // render số lượng
  cartNumber();
  // Tính tổng
  totalPrice();
  // Tăng giảm số lượng
  plusMinus(itemProduct);
  // Thêm sản phẩm
  const value = productsCart.findIndex((item) => itemProduct.id === item.id);
  if (value < 0) {
    itemProduct.inCart = 1;
    productsCart.push(itemProduct);
  } else {
    productsCart[value].inCart += 1;
  }
};

// Load sản phẩm
renderProductsCart();
// Load số lượng
cartNumber();
// Load tổng tiền
totalPrice();
// Xóa sản phẩm
const list = document.querySelector("#shopping-cart");
list.addEventListener("click", (event) => {
  let btn = event.target;
  let id = btn.dataset.id;
  if (id >= 0) {
    productsCart.splice(id, 1);
    productsLocalStorage = productsCart;
    localStorage.setItem("products", JSON.stringify(productsLocalStorage));
    renderProductsCart();
    cartNumber();
    totalPrice();
  }
});
