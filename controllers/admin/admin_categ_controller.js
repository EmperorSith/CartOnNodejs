// Get Category model
let Category = require("../../models/category");

let getCategorIndex = (req, res) => {
  Category.find()
    .then((categories) => {
      res.render("categories", {
        categories: categories,
      });
    })
    .catch((e) => console.log(e));
};

let getAddCategory = (req, res) => {
  res.render("add_category", {
    title: "Admin category",
  });
};

let addCategory = (req, res) => {
  let title = req.body.title;
  let slug = title.replace(/\s+/g, "-").toLowerCase();

  let category = new Category({
    title: title,
    slug: slug,
  });

  category
    .save()
    .then(() => {
      res.redirect("/admin/categories");
    })
    .catch((e) => console.log(e));
};

let deleteCategory = (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect("/admin/categories");
    })
    .catch((e) => console.log(e));
};
// Exports
module.exports = {
  getCategorIndex,
  getAddCategory,
  addCategory,
  deleteCategory,
};
