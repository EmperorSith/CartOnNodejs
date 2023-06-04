// Get Product&Category model
let Product = require("../models/product");
let Category = require("../models/category");

let getAllProducts = (req, res) => {
  Category.find().then((categories) => {
    Product.find()
      .then((products) => {
        res.render("all_products", {
          title: "All products",
          products: products,
          categories: categories,
        });
      })
      .catch((e) => console.log("Error", e));
  });
};

let getProductsByCat = (req, res) => {
  let categorySlug = req.params.category;

  Category.findOne({ slug: categorySlug })
    .then(function (c) {
      Product.find({ category: categorySlug })
        .then(function (products) {
          res.render("cat_products", {
            category: categorySlug,
            title: c.title,
            products: products,
          });
        })
        .catch((e) => console.log(e));
    })
    .catch((e) => console.log(e));
};

module.exports = {
  getAllProducts,
  getProductsByCat,
};
