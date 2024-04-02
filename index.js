//*Shopping Cart JS Code
//todo Tasks: Dynamic buttons : when you click button, item get added to cart
//todo when you click on your final cart, a modal shows up and items can be seen with details
//todo datas be saved on localStorage  or sessionStorage. If not available show empty cart

import { productsData } from "/products.js";

// Selectors
const backdrop = document.querySelector(".backdrop");
const cart = document.querySelector(".cart");
const cartBtn = document.querySelector(".cart__btn");
const cartExit = document.querySelector(".close--btn");
const productsList = document.querySelector(".shopProducts");
const cartTotalPrice = document.querySelector(".cart__totalPrice");
const cartBadge = document.querySelector(".cart--badge");
const cartCounter = document.querySelector(".cart--count");
const cartContent = document.querySelector(".cart__content");
const clearCartBtn = document.querySelector(".cart--btn--light");

// Cart Button Function

cartBtn.addEventListener("click", cartBtnFunc);

cartExit.addEventListener("click", cartExitFunc);

backdrop.addEventListener("click", cartExitGlobal);
// Displaying the products on load

document.addEventListener("DOMContentLoaded", () => {
  const products = new Products();
  const productsData = products.getProducts();
  const ui = new UI();
  Storage.getCart(cartArray) || Storage.saveCart(cartArray);

  if ((cartCounter.innerText = "0")) {
    cartBadge.style.display = "none";
  } else {
    cartBadge.style.display = "flex";
  }

  ui.setupApp();
  ui.displayProducts(productsData);
  ui.getAddToCartBtns();
  ui.cartLogic();
  Storage.saveProducts(productsData);
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
function cartExitGlobal() {
  backdrop.style.display = "none";
  cart.style.display = "none";
}

//todo 1.get products
//todo 2. display products
//todo 3. storage

//Classes
class Products {
  //get from api  end point !
  getProducts() {
    return productsData;
  }
}

let cartArray = [];

let buttonsDOM = [];

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
    const addToCartBtn = [...document.querySelectorAll(".addToCart__btn")];
    buttonsDOM = addToCartBtn;
    addToCartBtn.forEach((btn) => {
      const id = btn.dataset.id;
      //check if the product is in cart or not
      const isInCart = cartArray.find((item) => item.id === parseInt(id));
      if (isInCart) {
        btn.innerText = "Already In Cart";
        btn.disabled = true;
      }
      btn.addEventListener("click", (event) => {
        event.target.innerText = "Already In Cart";
        event.target.disabled = true;

        //get product from products
        const addedProducts = { ...Storage.getProducts(id), quantity: 1 };
        //add to cart
        cartArray = [...cartArray, addedProducts];

        //save cart to localStorge
        Storage.saveCart(cartArray);
        //update cart value
        this.setCartValue(cartArray);
        //add to cart item
        cartArray = Storage.getCart();
        this.displayCartItems(cartArray);
        //get cart from storage
      });
    });
  }
  setCartValue(cart) {
    if ((cartCounter.innerText = "0")) {
      cartBadge.style.display = "none";
    }
    let tempCartCounter = 0;
    const totalPrice = cart.reduce((acc, curr) => {
      tempCartCounter += curr.quantity;
      cartBadge.style.display = "flex";
      return acc + curr.quantity * curr.price;
    }, 0);
    cartTotalPrice.innerText = `total price: $${totalPrice.toFixed(2)}`;
    cartCounter.innerText = tempCartCounter;
    Storage.saveCart(cartArray);
  }
  displayCartItems(cart) {
    let result = "";
    cart.forEach((item) => {
      result += `<div class="cart__item">
          <div class="cartItem__image">
              <img src=${item.imageUrl}>
          </div>
          <div class="cartItem__info">
              <h3 class="cartItem__title">${item.title}<h3>
                      <h4 class="cartItem__price">$${item.price}</h4>
          </div>
          <div class="cartItem__btnBox">
              <div class="cartItem__controller">
                  <button class="cartItem--btn dec--btn" data-id=${item.id}>
                  <i class="cartItem--icon fa-solid fa-chevron-left"></i></button>
                  <p>${item.quantity}</p>
                  <button class="cartItem--btn inc--btn"  data-id=${item.id}>
                  <i class="cartItem--icon fa-solid fa-chevron-right"></i></button>
              </div>
              <button class="cartItem--btn remove--btn" data-id=${item.id}><i class="fa-solid fa-trash"></i></button>
          </div>
      </div>
    `;
    });
    if (result === "") {
      cartContent.innerHTML = `<p class="cartAlert">your cart is empty :(</p>`;
    } else {
      cartContent.innerHTML = result;
    }
    Storage.saveCart(cart);
  }

  setupApp() {
    // get cart from storage
    // if () {
    //   cartContent.innerHTML = `<p class="cartAlert">your cart is empty </p>`;
    // } else {
    cartArray = Storage.getCart();
    // }
    //add Cart Items tp UI
    this.displayCartItems(cartArray);
    //set values : price & items
    this.setCartValue(cartArray);
  }

  cartLogic() {
    //Clear Cart
    clearCartBtn.addEventListener("click", () => this.clearCartFunc());
  }
  clearCartFunc() {
    cartArray.forEach((item) => {
      this.removeItem(item.id);
    });

    while (cartContent.children.length) {
      cartContent.removeChild(cartContent.children[0]);
    }
    cartContent.innerHTML = `<p class="cartAlert">your cart is empty :(</p>`;
  }
  removeItem(id) {
    cartArray = cartArray.filter((cartItem) => cartItem.id != id);
    this.setCartValue(cartArray);
    Storage.saveCart(cartArray);
    this.updateAddCartBtns(id);
  }
  updateAddCartBtns(id) {
    //Update add to cart buttons
    const btn = buttonsDOM.find(
      (btn) => parseInt(btn.dataset.id) === parseInt(id)
    );
    btn.innerText = `add to cart`;
    btn.disabled = false;
  }
}

class Storage {
  static saveProducts(products) {
    localStorage.setItem("productsData", JSON.stringify(products));
  }
  static getProducts(id) {
    const _products = JSON.parse(localStorage.getItem("productsData"));
    return _products.find((p) => p.id == id);
  }
  static saveCart(cart) {
    localStorage.setItem("cartData", JSON.stringify(cart));
  }
  static getCart() {
    return JSON.parse(localStorage.getItem("cartData"));
  }
}
