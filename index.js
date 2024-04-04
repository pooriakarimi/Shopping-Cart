//*Shopping Cart JS CodesetCart
//todo Tasks: Dynamic buttons : when you click button, item get added to cart
//todo when you click on your final cart, a modal shows up and items can be seen with details
//todo datas be saved on localStorage  or sessionStorage. If not available show empty cart

import { productsData } from "/products.js";

// Selectors

// Cart Selectors

const cart = document.querySelector(".cart");
const cartBtn = document.querySelector(".cart__btn");
const cartExit = document.querySelector(".close--btn");
const cartTotalPrice = document.querySelector(".cart__totalPrice");
const cartBadge = document.querySelector(".cart--badge");
const cartCounter = document.querySelector(".cart--count");
const cartContent = document.querySelector(".cart__content");
const clearCartBtn = document.querySelector(".cart--btn--light");

// Global Selectors
const backdrop = document.querySelector(".backdrop");
const productsList = document.querySelector(".shopProducts");

const navMenu = document.querySelector(".navbar__menu");

// Liked Selectors
const likedBtn = document.querySelector(".liked__btn");
const likedExit = document.querySelector(".likedClose--btn");
const liked = document.querySelector(".liked");
const likedBadge = document.querySelector(".liked--badge");
const likedCounter = document.querySelector(".liked--count");
const likedContent = document.querySelector(".liked__content");
const clearLikedBtn = document.querySelector(".liked--btn--dark");

// Mobile Screen functions

let open;

function openMenu() {
  if (open) {
    navMenu.style.display = "none";
    open = false;
  } else if (!open) {
    navMenu.style.display = "block";
    open = true;
  }
}

// Cart Button Function

cartBtn.addEventListener("click", cartBtnFunc);

cartExit.addEventListener("click", cartExitFunc);

backdrop.addEventListener("click", cartExitGlobal);

// Liked Button Function

likedBtn.addEventListener("click", likedBtnFunc);

likedExit.addEventListener("click", likedExitFunc);

backdrop.addEventListener("click", likedExitGlobal);

// Displaying the products on load

document.addEventListener("DOMContentLoaded", () => {
  const products = new Products();
  const productsData = products.getProducts();
  const ui = new UI();
  Storage.getCart(cartArray) || Storage.saveCart(cartArray);
  Storage.getLiked(likedArray) || Storage.saveLiked(likedArray);

  if ((cartCounter.innerText = "0")) {
    cartBadge.style.display = "none";
  } else {
    cartBadge.style.display = "flex";
  }
  if ((likedCounter.innerText = "0")) {
    likedBadge.style.display = "none";
  } else {
    likedBadge.style.display = "flex";
  }

  ui.setupApp();
  ui.displayProducts(productsData);
  ui.getAddToCartBtns();
  ui.getLikeBtns();
  ui.cartLogic();
  ui.likedLogic();
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

function likedBtnFunc() {
  backdrop.style.display = "block";
  liked.style.display = "flex";
}
function likedExitFunc() {
  backdrop.style.display = "none";
  liked.style.display = "none";
}
function likedExitGlobal() {
  backdrop.style.display = "none";
  liked.style.display = "none";
}
//Classes
class Products {
  //get from api  end point !
  getProducts() {
    return productsData;
  }
}

let cartArray = [];
let buttonsDOM = [];

let likedArray = [];
let likedButtonsDOM = [];

class UI {
  displayProducts(products) {
    let result = "";
    products.forEach((item) => {
      result += `<div class="product">
      <div class="product__image">
          <button class="product__likeBtn" data-id=${item.id}><ion-icon name="heart-outline" ></ion-icon></button>
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
  getLikeBtns() {
    const likeBtn = [...document.querySelectorAll(".product__likeBtn")];
    likedButtonsDOM = likeBtn;

    likedButtonsDOM.forEach((btn) => {
      const id = btn.dataset.id;
      //check if the product is in liked or not
      const isInLiked = likedArray.find((item) => item.id === parseInt(id));
      if (isInLiked) {
        btn.innerHTML = `<ion-icon name="heart"></ion-icon>`;
        btn.firstElementChild.style.color = "var(--textColorDiscount)";
      }
      btn.addEventListener("click", (event) => {
        btn.innerHTML = `<ion-icon name="heart"></ion-icon>`;
        btn.firstElementChild.style.color = "var(--textColorDiscount)";
        btn.disabled = true;

        //get product from products
        const likedProducts = { ...Storage.getProducts(id) };
        //add to liked
        likedArray = [...likedArray, likedProducts];

        //save liked to localStorge
        Storage.saveLiked(likedArray);
        //update liked value
        this.setLikedValue(likedArray);
        //add to liked item
        likedArray = Storage.getLiked();
        this.displayLikedItems(likedArray);
        //get liked from storage
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
  setLikedValue(cart) {
    const totalLikedItem = cart.length;
    likedCounter.innerText = `${totalLikedItem}`;
    likedBadge.style.display = "flex";

    Storage.saveLiked(likedArray);

    if (likedCounter.innerText == "0") {
      likedBadge.style.display = "none";
    }
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
                  <p class="cartItem__quantity">${item.quantity}</p>
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
  displayLikedItems(cart) {
    let result = "";
    cart.forEach((item) => {
      result += ` <div class="liked__item">
      <div class="likedItem__image">
          <img src=${item.imageUrl}>
      </div>
      <div class="likedItem__info">
          <h3 class="likedItem__title">${item.title}<h3>
                  <h4 class="likedItem__price">$${item.price}</h4>
      </div>
      <button class="likedItem--btn remove--btn" data-id=${item.id}><i
              class="fa-solid fa-trash"></i></button>

  </div>`;
    });
    if (result === "") {
      likedContent.innerHTML = `<p class="likedAlert">your list is empty</p>
      `;
    } else {
      likedContent.innerHTML = result;
    }
    Storage.saveLiked(cart);
  }

  setupApp() {
    cartArray = Storage.getCart();
    likedArray = Storage.getLiked();
    //add Cart Items to UI
    this.displayCartItems(cartArray);
    this.displayLikedItems(likedArray);
    //set values : price & items
    this.setCartValue(cartArray);
    this.setLikedValue(likedArray);
  }

  likedLogic() {
    //Clear Liked
    clearLikedBtn.addEventListener("click", () => this.clearLikedFunc());

    //Cart inner Func
    likedContent.addEventListener("click", (event) => {
      if (event.target.classList.contains("remove--btn")) {
        const removedItem = event.target;
        const removedProduct = likedArray.find((item) => {
          return parseInt(item.id) === parseInt(removedItem.dataset.id);
        });

        this.removeLikedItem(removedProduct.id);
        Storage.saveLiked(likedArray);

        likedContent.removeChild(removedItem.parentElement);

        if (likedContent.children.length === 0) {
          likedContent.innerHTML = `<p class="likedAlert">your list is empty</p>`;
        }
      }
    });
  }
  cartLogic() {
    //Clear Cart
    clearCartBtn.addEventListener("click", () => this.clearCartFunc());

    //Cart inner functions
    cartContent.addEventListener("click", (event) => {
      if (event.target.classList.contains("remove--btn")) {
        const removedItem = event.target;
        const removedProduct = cartArray.find((item) => {
          return parseInt(item.id) === parseInt(removedItem.dataset.id);
        });

        this.removeItem(removedProduct.id);
        Storage.saveCart(cartArray);

        cartContent.removeChild(removedItem.parentElement.parentElement);

        if (cartContent.children.length === 0) {
          cartContent.innerHTML = `<p class="cartAlert">your cart is empty :(</p>`;
        }
      } else if (event.target.classList.contains("inc--btn")) {
        //get item from cart
        const addQuantity = event.target;
        // console.log(addQuantity.dataset.id);
        const increasedProduct = cartArray.find((item) => {
          return parseInt(item.id) === parseInt(addQuantity.dataset.id);
        });
        increasedProduct.quantity++;

        //update cart value
        this.setCartValue(cartArray);

        // save cart
        Storage.saveCart(cartArray);

        //Update UI
        // const productCounter = document.querySelector(".cartItem__quantity");
        addQuantity.previousElementSibling.innerText = `${increasedProduct.quantity}`;
      } else if (event.target.classList.contains("dec--btn")) {
        const decItem = event.target;
        // console.log(addQuantity.dataset.id);
        const decreasedProduct = cartArray.find((item) => {
          return parseInt(item.id) === parseInt(decItem.dataset.id);
        });
        if (decreasedProduct.quantity === 1) {
          this.removeItem(decreasedProduct.id);
          cartContent.removeChild(
            decItem.parentElement.parentElement.parentElement
          );
          if (cartContent.children.length === 0) {
            cartContent.innerHTML = `<p class="cartAlert">your cart is empty :(</p>`;
          }
        } else {
          decreasedProduct.quantity--;

          //update cart value
          this.setCartValue(cartArray);

          // save cart
          Storage.saveCart(cartArray);

          //Update UI

          decItem.nextElementSibling.innerText = `${decreasedProduct.quantity}`;
        }
      }
    });
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

  clearLikedFunc() {
    likedArray.forEach((item) => {
      this.removeLikedItem(item.id);
    });

    while (likedContent.children.length) {
      likedContent.removeChild(likedContent.children[0]);
    }
    likedContent.innerHTML = `<p class="likedAlert">your list is empty</p>`;
  }

  removeItem(id) {
    cartArray = cartArray.filter((cartItem) => cartItem.id != id);
    this.setCartValue(cartArray);
    Storage.saveCart(cartArray);
    this.updateAddCartBtns(id);
  }
  removeLikedItem(id) {
    likedArray = likedArray.filter((likedItem) => likedItem.id != id);
    this.setLikedValue(likedArray);
    Storage.saveLiked(likedArray);
    this.updateLikedCartBtns(id);
  }
  updateAddCartBtns(id) {
    //Update add to cart buttons
    const btn = buttonsDOM.find(
      (btn) => parseInt(btn.dataset.id) === parseInt(id)
    );
    btn.innerText = `add to cart`;
    btn.disabled = false;
  }
  updateLikedCartBtns(id) {
    //Update like buttons
    const btn = likedButtonsDOM.find(
      (btn) => parseInt(btn.dataset.id) === parseInt(id)
    );
    btn.innerHTML = `<ion-icon name="heart-outline"></ion-icon>`;
    btn.firstElementChild.style.color = "var(--textColorDark)";
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
  static saveLiked(cart) {
    localStorage.setItem("likedData", JSON.stringify(cart));
  }
  static getCart() {
    return JSON.parse(localStorage.getItem("cartData"));
  }

  static getLiked() {
    return JSON.parse(localStorage.getItem("likedData"));
  }
}
