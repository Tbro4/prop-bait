const db = require("../config/connection");
const { User, Product, ProductSubCategory } = require("../models");
const userSeeds = require("./userSeeds.json");
const productSeeds = require("./productSeeds.json");
const productSubCategorySeeds = require("./productSubCategorySeeds.json");

db.once("open", async () => {
  try {
    await Product.deleteMany({});
    await ProductSubCategory.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);
    await Product.create(productSeeds);
    await ProductSubCategory.create(productSubCategorySeeds);

    console.log("all done!");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
