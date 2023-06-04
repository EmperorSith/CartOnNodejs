let Order = require("../models/order");
let store = require("store2");

let getCart = (req, res) => {
  res.render("cart", {
    title: "Cart",
    cart: req.session.cart,
  });
};

let addToCart = (req, res) => {
  const { id, title, price } = req.body;

  if (typeof req.session.cart == "undefined") {
    req.session.cart = [];

    const cart_data = {
      id: id,
      title: title,
      price: parseFloat(price),
      quantity: 1,
    };
    req.session.cart.push(cart_data);
  } else {
    let cart = req.session.cart;
    let newItem = true;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === id) {
        cart[i].quantity++;
        newItem = false;
        break;
      }
    }
    if (newItem) {
      cart.push({
        id: id,
        title: title,
        price: parseFloat(price),
        quantity: 1,
      });
    }

    let cartLS = JSON.stringify(cart);
    //Setting store key and data
    store("cartLocalStorage", { cartLS });

    //Setting multiple store key and data
    console.log(store.getAll());
  }

  res.redirect("back");
};

let updateCart = (req, res) => {
  let slug = req.params.product;
  let cart = req.session.cart;
  let action = req.query.action;

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].title == slug) {
      switch (action) {
        case "add":
          cart[i].quantity++;
          break;
        case "remove":
          cart[i].quantity--;
          if (cart[i].quantity < 1) cart.splice(i, 1);
          break;
        case "clear":
          cart.splice(i, 1);
          if (cart.length == 0) delete req.session.cart;
          break;
        default:
          console.log("update problem");
          break;
      }
      break;
    }
    let cartLS = JSON.stringify(cart);
    //Setting store key and data
    store("cartLocalStorage", { cartLS });

    //Setting multiple store key and data
    console.log(store.getAll());
  }
  res.redirect("/cart");
};

let clearCart = (req, res) => {
  delete req.session.cart;
  res.redirect("/cart");
};

let saveOrderInMongoDb = (req, res) => {
  let cart = req.session.cart;
  let { name, email, phone, address } = req.body;
  let order = new Order({ name, email, phone, address, cart: cart });
  order
    .save()
    .then(() => {
      delete req.session.cart;
      res.redirect("back");
    })
    .catch((e) => console.log(e, "error"));
};

module.exports = {
  getCart,
  addToCart,
  updateCart,
  clearCart,
  saveOrderInMongoDb,
};
