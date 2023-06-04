let fs = require("fs-extra");
// Get Product&Category model
let Product = require("../../models/product");
let Category = require("../../models/category");

let getProductsIndex = (req, res) => {
  var count;
  Product.count()
    .then((c) => (count = c))
    .catch((e) => console.log(e));

  Product.find()
    .then((products) => {
      res.render("products", {
        products: products,
        count: count,
      });
    })
    .catch((e) => console.log(e));
};

let getAddProduct = (req, res) => {
  Category.find()
    .then((categories) => {
      res.render("add_product", {
        categories: categories,
      });
    })
    .catch((e) => console.log(e));
};

let addProduct = (req, res) => {
  if (req.files) var imageFile = req.files.image.name;
  else {
    imageFile = "";
  }
  let { title, price, category } = req.body;
  let slug = req.body.title.replace(/\s+/g, "-").toLowerCase();

  let price2 = parseFloat(price).toFixed(2);

  let product = new Product({
    title: title,
    slug: slug,
    price: price2,
    category: category,
    image: imageFile,
  });
  product
    .save()
    .then(() => {
      let mainUploadPathOnServer = "public/product_images/" + product._id;
      fs.mkdirp(mainUploadPathOnServer).then(() => {
        if (imageFile != "") {
          console.log(typeof req.files.image);
          let productImage = req.files.image;
          let uploadPath = mainUploadPathOnServer + "/" + imageFile;

          productImage.mv(uploadPath, function (err) {
            return console.log(err);
          });
        }
        res.redirect("/admin/products");
      });
    })

    .catch(() => console.log("dddd"));
};

let deleteProduct = (req, res) => {
  let id = req.params.id;
  let mainUploadPathOnServer = "public/product_images/" + id;
  Product.findByIdAndRemove(id)
    .then(() => {
      fs.remove(mainUploadPathOnServer, function (err) {
        if (err) console.log(err);
        else {
          res.redirect("/admin/products");
        }
      });
    })
    .catch((e) => console.log(e));
};

module.exports = {
  getProductsIndex,
  getAddProduct,
  addProduct,
  deleteProduct,
};
