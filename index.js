//*Shopping Cart JS Code
//todo Tasks: Dynamic buttons : when you click button, item get added to cart
//todo when you click on your final cart, a modal shows up and items can be seen with details
//todo datas be saved on localStorage  or sessionStorage. If not available show empty cart

// Selectors

const backdrop = document.querySelector(".backdrop");
const cart = document.querySelector(".cart");
const cartBtn = document.querySelector(".cart__btn");
const cartExit = document.querySelector(".close--btn");
// Cart Button Function
cartBtn.addEventListener("click", cartBtnFunc);
cartExit.addEventListener("click", cartExitFunc);

function cartBtnFunc() {
  backdrop.style.display = "block";
  cart.style.display = "flex";
}
function cartExitFunc() {
  backdrop.style.display = "none";
  cart.style.display = "none";
}

//todo 1.get products
//todo 2. display products
//todo 3. storage

import { productsData } from "/products.js";

class Products {
  //get from api  end point !
  getProducts() {
    return productsData;
  }
}
class UI {}

class storage {}

document.addEventListener("DOMContentLoaded", () => {
  console.log("Loaded!");
});
