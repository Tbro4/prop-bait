const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    required: "product needs a name",
    trim: true,
  },
  price: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },

  brand: {
    type: String,
    required: true,
    trim: true,
  },

  image: {
    type: String,
    required: true,
    trim: true,
  },
  hasMeasurement: {},
});

const Product = model("Product", productSchema);

module.exports = Product;
