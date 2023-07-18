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
    onSaleProducts: async () => {
      return Product.find({ onSale: true });
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
    userOrders: async (parent, { userId }) => {
      const user = await User.findById(userId);

      if (!user) {
        throw new GraphQLError("User not found");
      }

      return user.orders.map((order) => ({
        _id: order._id,
        createdAt: order.createdAt,
      }));
    },
    userOrderCart: async (parent, { orderId }) => {
      const order = await User.findOne({ "orders._id": orderId });

      if (!order) {
        throw new GraphQLError("Order not found");
      }

      const userCart = order.orders.find(
        (o) => o._id.toString() === orderId
      ).userCart;

      return Promise.all(
        userCart.map(async (cartItem) => {
          let product = null;
          let option = null;

          product = await Product.findOne({
            options: { $elemMatch: { _id: cartItem.option } },
          });

          if (!product) {
            product = await Product.findById(cartItem.option);
          } else {
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

        let updatedQuantity = option.quantity; // Initialize with the new quantity

        if (existingCartItemIndex !== -1) {
          // If the option already exists, update the quantity while limiting it to 99
          const currentQuantity = user.cart[existingCartItemIndex].quantity;
          updatedQuantity = Math.min(currentQuantity + option.quantity, 99);
        } else {
          // If the option doesn't exist, limit the quantity to 99
          updatedQuantity = Math.min(option.quantity, 99);
        }

        // Update the quantity in the cart
        if (existingCartItemIndex !== -1) {
          user.cart[existingCartItemIndex].quantity = updatedQuantity;
        } else {
          user.cart.push({ option: option.option, quantity: updatedQuantity });
        }
      }

      // Save the updated user object with the modified cart
      const updatedUser = await user.save();

      // Populate the option field in the cart items
      await updatedUser.populate("cart.option").execPopulate();

      // Return the updated cart items
      return updatedUser.cart;
    },

    updateCartItemQuantity: async (
      parent,
      { userId, cartItemId, quantity }
    ) => {
      const user = await User.findById(userId);

      // Check if the user exists
      if (!user) {
        throw new GraphQLError("User not found");
      }

      // Find the cart item by ID
      const cartItem = user.cart.find(
        (item) => item._id.toString() === cartItemId
      );

      // Update the quantity if the cart item exists
      if (cartItem) {
        cartItem.quantity = quantity;
      } else {
        throw new GraphQLError("Cart item not found");
      }

      // Save the updated user object with the modified cart
      const updatedUser = await user.save();

      // Populate the option field in the updated cart item
      await updatedUser.populate("cart.option").execPopulate();

      // Find and return the updated cart item
      const updatedCartItem = updatedUser.cart.find(
        (item) => item._id.toString() === cartItemId
      );
      return updatedCartItem;
    },
    removeCartItem: async (parent, { userId, cartItemId }) => {
      const user = await User.findById(userId);

      // Check if the user exists
      if (!user) {
        throw new GraphQLError("User not found");
      }

      // Find the index of the cart item to remove
      const cartItemIndex = user.cart.findIndex(
        (item) => item._id.toString() === cartItemId
      );

      // Check if the cart item exists
      if (cartItemIndex !== -1) {
        // Remove the cart item from the cart array
        user.cart.splice(cartItemIndex, 1);
      } else {
        throw new GraphQLError("Cart item not found");
      }

      // Save the updated user object with the modified cart
      const updatedUser = await user.save();

      // Populate the option field in the updated cart item
      await updatedUser.populate("cart.option").execPopulate();

      // Return the removed cart item
      return updatedUser.cart.find(
        (item) => item._id.toString() === cartItemId
      );
    },
    createOrder: async (parent, { userId, userCart }) => {
      try {
        const user = await User.findById(userId);

        if (!user) {
          throw new GraphQLError("User not found");
        }

        const order = {
          userId,
          userCart,
          createdAt: new Date().toISOString(),
        };

        // Push the order to the User's document
        user.orders.push(order);

        // Save the updated User document
        await user.save();

        return order;
      } catch (error) {
        throw new GraphQLError("Error creating order");
      }
    },
  },
};

module.exports = resolvers;
