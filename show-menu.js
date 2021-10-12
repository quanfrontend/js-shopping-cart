const showMenu = () => {
  const btnMenu = document.querySelector("#menu-toggle");
  const boxMenu = document.querySelector(".navbar");
  const menuCart = document.querySelector(".shopping-cart");
  btnMenu.addEventListener("click", () => {
    boxMenu.classList.toggle("active");
    menuCart.classList.remove("active");
  });
};
showMenu();
