let express = require("express");
let router = express.Router();
let {
  getCategorIndex,
  getAddCategory,
  addCategory,
  deleteCategory,
} = require("../controllers/admin/admin_categ_controller");

//GET category index
router.get("/admin/categories", getCategorIndex);
//GET add category
router.get("/admin/add-category", getAddCategory);
//POST add category
router.post("/admin/add-category", addCategory);
//Delete category
router.delete("/admin/categories/:id", deleteCategory);

// Exports
module.exports = router;
