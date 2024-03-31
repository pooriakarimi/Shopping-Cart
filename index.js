//*Shopping Cart JS Code
//todo Tasks: Dynamic buttons : when you click button, item get added to cart
//todo when you click on your final cart, a modal shows up and items can be seen with details
//todo datas be saved on localStorage  or sessionStorage. If not available show empty cart

// Selectors

const backdrop = document.querySelector(".backdrop");
const cart = document.querySelector(".cart");
const cartBtn = document.querySelector(".cart__btn");
const cartExit = document.querySelector(".close--btn");
const productsList = document.querySelector(".shopProducts");
// Cart Button Function

cartBtn.addEventListener("click", cartBtnFunc);

cartExit.addEventListener("click", cartExitFunc);

// Displaying the products on load

document.addEventListener("DOMContentLoaded", () => {
  const products = new Products();
  const productsData = products.getProducts();
  const ui = new UI();
  ui.displayProducts(productsData);
  Storage.saveProducts(productsData);
  ui.getAddToCartBtns();
});

// DOM Functions

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

const cartArray = [];
import { productsData } from "/products.js";

class Products {
  //get from api  end point !
  getProducts() {
    return productsData;
  }
}
class UI {
  displayProducts(products) {
    let result = "";
    products.forEach((item) => {
      result += `<div class="product">
      <div class="product__image">
          <button class="product__likeBtn"><img src="/Assets/icons/liked.svg"></button>
          <img src=${item.imageUrl}>

          <span for="" class="product__offPercent"></span>

          <button class="addToCart__btn " data-id=${item.id}>Add To Cart</button>
      </div>
      <div class="product__info">
          <h3 class="product__title">${item.title}</h3>
          <h4 class="product__price">$ ${item.price}</h4>
          <h4 class="product__offPrice"></h4>
      </div>
  </div>`;
      productsList.innerHTML = result;
    });
  }

  getAddToCartBtns() {
    const addToCartBtn = document.querySelectorAll(".addToCart__btn");
    const addToCartBtnArray = [...addToCartBtn];
    addToCartBtnArray.forEach((btn) => {
      const btnID = btn.dataset.id;
      console.log(btnID);
    });
  }
}

class Storage {
  static saveProducts(products) {
    localStorage.setItem("productsData", JSON.stringify(products));
  }
}
