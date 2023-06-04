let express = require("express");
let router = express.Router();
let {
  getCart,
  addToCart,
  updateCart,
  clearCart,
  saveOrderInMongoDb,
} = require("../controllers/cart_controller");

//GET cart
router.get("/cart", getCart);
//Create Route for Add Item into Cart
router.post("/add-cart", addToCart);
//GET update product
router.get("/cart/update/:product", updateCart);
//GET clear cart
router.get("/cart/clear", clearCart);
//Save order in DB
router.post("/save-order", saveOrderInMongoDb);

// Exports
module.exports = router;
