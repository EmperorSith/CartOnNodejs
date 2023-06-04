let express = require("express");
let router = express.Router();
let {
  getAllProducts,
  getProductsByCat,
} = require("../controllers/products_byCat_controller");

//GET all products
router.get("/", getAllProducts);
//GET products by category
router.get("/products/:category", getProductsByCat);

// Exports
module.exports = router;
