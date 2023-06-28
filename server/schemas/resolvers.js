const { GraphQLError } = require("graphql");
const { User, Product, Option, ProductSubCategory } = require("../models");
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
      return Product.findById(productId).populate("options");
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
    userCart: async (parent, { userId }) => {
      const user = await User.findById(userId);

      if (!user) {
        throw new GraphQLError("User not found");
      }

      return Promise.all(
        user.cart.map(async (cartItem) => {
          let product = null;
          let option = null;

          // Search for options with the given ID
          product = await Product.findOne({
            options: { $elemMatch: { _id: cartItem.option } },
          });

          if (!product) {
            // If options not found, search for products with the given ID
            product = await Product.findById(cartItem.option);
          } else {
            // If options found, retrieve the specific option
            option = product.options.find(
              (opt) => opt._id.toString() === cartItem.option.toString()
            );
          }

          return {
            _id: cartItem._id,
            option: option || null,
            quantity: cartItem.quantity,
            product: product || null,
          };
        })
      );
    },

    // userCart: async (parent, { userId }) => {
    //   const user = await User.findById(userId).populate({
    //     path: "cart.option",
    //     model: "Option",
    //   });
    //   console.log(user);

    //   if (!user) {
    //     throw new GraphQLError("User not found");
    //   }

    //   return user.cart.map(async (cartItem) => {
    //     const product = await Product.findOne({ options: cartItem.option });
    //     return {
    //       _id: cartItem._id,
    //       option: cartItem.option,
    //       quantity: cartItem.quantity,
    //       product: product || null,
    //     };
    //   });
    // },
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
    addToCart: async (parent, { userId, options }) => {
      const user = await User.findById(userId);

      // Check if the user exists
      if (!user) {
        throw new GraphQLError("User not found");
      }

      // Loop through the options to add/update quantities in the cart
      for (const option of options) {
        const existingCartItemIndex = user.cart.findIndex(
          (item) => item.option.toString() === option.option
        );

        if (existingCartItemIndex !== -1) {
          // If the option already exists, update the quantity
          user.cart[existingCartItemIndex].quantity += option.quantity;
        } else {
          // If the option doesn't exist, add it to the cart
          user.cart.push(option);
        }
      }

      // Save the updated user object with the modified cart
      const updatedUser = await user.save();

      // Populate the option field in the cart items
      await updatedUser.populate("cart.option").execPopulate();

      // Return the updated cart items
      return updatedUser.cart;
    },
  },
};

module.exports = resolvers;
