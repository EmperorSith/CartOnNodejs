let mongoose = require("mongoose");
//Order Schema
let OrderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },

    cart: {
      type: Object,
      required: true,
    },
  },

  { timestamps: true }
);

let Order = (module.exports = mongoose.model("Order", OrderSchema));
