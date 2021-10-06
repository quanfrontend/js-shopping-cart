const showCart = () => {
  const btnCart = document.querySelector("#cart-btn");
  const menuCart = document.querySelector(".shopping-cart");
  const boxMenu = document.querySelector(".navbar");
  btnCart.addEventListener("click", () => {
    menuCart.classList.toggle("active");
    boxMenu.classList.remove("active");
  });
};
showCart();
