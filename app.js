let express = require("express");
let app = express();
const PORT = process.env.PORT || 3000;
let path = require("path");
let methodOverride = require("method-override");
let mongoose = require("mongoose");
let session = require("express-session");
let fileUpload = require("express-fileupload");
require("dotenv").config();

const db = process.env.MONGO_URL;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Set public folder
app.use(express.static(path.join(__dirname, "public")));
//POST&PUT middlewars
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
//Fileupload middlewar
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);
// Get Category Model
let Category = require("./models/category");
//Get all categories to pass to header.ejs
Category.find()
  .then((categories) => {
    app.locals.categories = categories;
  })
  .catch((e) => console.log(e));

//Express session middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    //cookie: { secure: true },
  })
);

app.use((req, res, next) => {
  res.locals.cart = req.session.cart;
  next();
});

//Routes
let adminCategories = require("./routes/admin_categories");
let adminProducts = require("./routes/admin_products");
let products = require("./routes/products");
let cart = require("./routes/cart");

app.use(adminCategories);
app.use(adminProducts);
app.use(products);
app.use(cart);

// Connection to server and MongoDb
async function start() {
  try {
    await mongoose.connect(db);
    console.log(`Connection to MongoDb is success!`);
    app.listen(PORT, () => {
      console.log(`Server is listening PORT ${PORT}...`);
    });
  } catch (error) {
    console.log(" \n Connection error!!! \n\n", error);
  }
}

start();
