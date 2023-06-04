let express = require("express");
let router = express.Router();
let {
  getProductsIndex,
  getAddProduct,
  addProduct,
  deleteProduct,
} = require("../controllers/admin/admin_prod_contoller");

//GET products index
router.get("/admin/products", getProductsIndex);
//GET add product
router.get("/admin/add-product", getAddProduct);
//POST add product
router.post("/admin/add-product", addProduct);
//Delete product
router.delete("/admin/products/:id", deleteProduct);

// Exports
module.exports = router;
