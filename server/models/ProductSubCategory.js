const { Schema, model } = require("mongoose");

const productSubCategorySchema = new Schema({
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
    required: true,
    trim: true,
  },
});

const ProductSubCategory = model(
  "ProductSubCategory",
  productSubCategorySchema
);

module.exports = ProductSubCategory;
