const { Schema, model, Types } = require("mongoose");

const optionSchema = new Schema(
  {
    _id: {
      type: Types.ObjectId,
      default: Types.ObjectId,
    },

    image: {
      type: String,
      required: false,
      trim: true,
    },
    color: {
      type: String,
      required: false,
      trim: true,
    },
    test: {
      type: String,
      required: false,
      trim: true,
    },
    diameter: {
      type: String,
      required: false,
      trim: true,
    },
    size: {
      type: String,
      required: false,
      trim: true,
    },
    weight: {
      type: String,
      required: false,
      trim: true,
    },
    length: {
      type: String,
      required: false,
      trim: true,
    },
    type: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { _id: false }
);

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: String,
    required: true,
    trim: true,
  },
  salePrice: {
    type: String,
    required: true,
    trim: true,
  },
  onSale: {
    type: Boolean,
    required: true,
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
  category: {
    type: String,
    required: true,
    trim: true,
  },
  subCategory: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: false,
    trim: true,
  },
  hasMeasurement: {},
  options: [optionSchema],
});

const Product = model("Product", productSchema);
const Option = model("Option", optionSchema);

module.exports = { Product, Option };
