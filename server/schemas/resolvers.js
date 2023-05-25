const { GraphQLError } = require("graphql");
const { User, Product, ProductSubCategory } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    products: async () => {
      return Product.find();
    },
    productById: async (parent, { productId }) => {
      return Product.findById(productId);
    },

    productsByCategory: async (parent, { category }) => {
      return Product.find({ category: category });
    },

    productsBySubCategory: async (parent, { subCategory }) => {
      return Product.find({ subCategory });
    },
    subCategoryByCategory: async (parent, { category }) => {
      return ProductSubCategory.find({ category });
    },
    productsByKeyword: async (parent, { keyword }) => {
      const regex = new RegExp(keyword, "i");
      return Product.find({
        $or: [
          { brand: regex },
          { category: regex },
          { subCategory: regex },
          { name: regex },
        ],
      });
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new GraphQLError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new GraphQLError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
