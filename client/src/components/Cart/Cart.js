import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER_CART } from "../../utils/queries";
import {
  UPDATE_CART_ITEM_QUANTITY,
  REMOVE_CART_ITEM,
  CREATE_ORDER,
  CLEAR_CART,
} from "../../utils/mutations";
import AuthService from "../../utils/auth";
import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Snackbar from "@mui/material/Snackbar";
import Sales from "../Sales/Sales";

import "./Cart.css";

const Cart = ({ setView, view, onGoBack, previousView, onProductClick }) => {
  const profile = AuthService.getProfile();
  const userId = profile ? profile.data._id : null;

  const [updateCartItemQuantity] = useMutation(UPDATE_CART_ITEM_QUANTITY);
  const [removeCartItem] = useMutation(REMOVE_CART_ITEM);
  const [clearCart] = useMutation(CLEAR_CART, {
    refetchQueries: [{ query: QUERY_USER_CART, variables: { userId } }],
  });
  const [createOrder] = useMutation(CREATE_ORDER);
  const [orderComplete, setOrderComplete] = useState(false);
  const [isCartEmpty, setIsCartEmpty] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (!profile) {
      // User is not logged in, load account login/signup component.
      setView("account");
    }
  }, [profile, setView]);

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    try {
      await updateCartItemQuantity({
        variables: { userId, cartItemId, quantity: newQuantity },
        refetchQueries: [{ query: QUERY_USER_CART, variables: { userId } }],
      });
    } catch (err) {}
  };

  const hasZeroQuantityItem = () => {
    return userCart.some((cartItem) => cartItem.quantity === 0);
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      await removeCartItem({
        variables: { userId, cartItemId },
        refetchQueries: [{ query: QUERY_USER_CART, variables: { userId } }],
      });
      handleSnackbarOpen();
    } catch (err) {}
  };

  const { loading, error, data, refetch } = useQuery(QUERY_USER_CART, {
    variables: { userId },
  });
  //ensures the latest cart data is fetched when Cart.js is rendered
  useEffect(() => {
    refetch();
  }, [refetch, userId]);

  const userCart = data?.userCart;

  useEffect(() => {
    if (loading) {
      return;
    }

    if (error) {
      return;
    }

    if (userCart.length === 0) {
      setIsCartEmpty(true);
    } else {
      setIsCartEmpty(false);
    }
  }, [loading, error, userCart]);

  if (loading) {
    return <p>Loading cart data...</p>;
  }

  if (error) {
    return <p>Error retrieving cart data.</p>;
  }

  const cartItems = userCart.map((cartItem) => ({
    option: cartItem.option ? cartItem.option._id : cartItem.product._id,
    quantity: cartItem.quantity,
  }));

  // Calculate subtotal
  let subtotal = 0;
  userCart.forEach((item) => {
    const itemSubtotal =
      parseFloat(
        item.product.onSale ? item.product.salePrice : item.product.price
      ) * item.quantity;
    subtotal += itemSubtotal;
  });

  let shippingRate = subtotal > 150 ? 0 : 0.03;
  let taxRate = 0.05;
  let savings = 0;

  //calculate savings
  userCart.forEach((item) => {
    if (item.product.onSale) {
      const salePrice = item.product.salePrice;
      const price = item.product.price;
      const savingsAmount = salePrice - price;
      savings += savingsAmount * item.quantity;
    }
  });

  const handleCheckout = async () => {
    if (hasZeroQuantityItem()) {
      // Display an error message or take any other desired action
      console.log("Remove items with quantity zero from the cart");
      return;
    }

    try {
      // Call the createOrder mutation and pass the userCart data
      const { data } = await createOrder({
        variables: { userId, userCart: cartItems },
      });

      // Optional: Handle successful checkout, e.g., show success message, redirect, etc.
      console.log("Order created:", data);

      // Clear the cart by calling the clearCart mutation
      await clearCart({ variables: { userId } });

      // Optionally set the orderComplete state here
      setOrderComplete(true);
    } catch (error) {
      // Handle error during checkout
      console.error("Error during checkout:", error);
    }
  };

  const handleProductClick = (productId) => {
    // Pass the clicked product ID to the parent component
    onProductClick(productId);
  };

  const taxAmount = subtotal * taxRate;
  const shippingAmount = subtotal * shippingRate;
  const totalCost = subtotal + shippingAmount + taxAmount;

  return (
    <>
      <div className="cart-container">
        <br />
        <h1 className="username">{profile.data.username}'s cart</h1>

        <div className="cart-checkout">
          <div className="cart-items">
            {/* Display a message if the cart is empty */}
            {isCartEmpty && (
              <div className="empty-cart-message">
                <p>No items in cart! Check out these great sales below!</p>
              </div>
            )}
            {userCart.map((item) => (
              <div key={item._id} className="cart-item">
                {item.option && item.option.image ? (
                  <img
                    className="option-image cart-image"
                    src={require(`../../images/${item.option.image}`)}
                    alt="Product"
                    onClick={() => handleProductClick(item.product._id)}
                  />
                ) : (
                  <img
                    className="option-image cart-image"
                    src={require(`../../images/${item.product.image}`)}
                    alt="Product"
                    onClick={() => handleProductClick(item.product._id)}
                  />
                )}
                <div
                  className="cart-item-details"
                  onClick={() => handleProductClick(item.product._id)}
                >
                  <p className="cart-item-name">{item.product.name}</p>
                  {item.option &&
                    Object.entries(item.option).map(([key, value]) => {
                      if (
                        value &&
                        key !== "__typename" &&
                        key !== "_id" &&
                        key !== "image"
                      ) {
                        //capitalize first letter of each key
                        const capitalizedKey =
                          key.charAt(0).toUpperCase() + key.slice(1);
                        return (
                          <p key={key} className="cart-item-options">
                            {capitalizedKey}: {value}
                          </p>
                        );
                      }
                      return null;
                    })}
                </div>

                <div className="cart-qty-price">
                  <div className="qty-delete">
                    <p className="cart-item-quantity">
                      Qty:{" "}
                      <input
                        className="qty-input"
                        type="number"
                        min="0"
                        value={item.quantity}
                        onChange={(e) => {
                          let value = e.target.value;

                          // Enforce maximum length of 2 digits
                          if (value.length > 2) {
                            value = value.slice(0, 2);
                          }

                          // Remove leading zeros. (Allows us to delete both numbers and have a 0 for quantity)
                          value = value.replace(/^0+/, "");

                          // Update the input value and pass it to the handler function
                          e.target.value = value;
                          handleQuantityChange(item._id, parseInt(value) || 0);
                        }}
                      />
                    </p>

                    <Button
                      className="remove-item-button"
                      onClick={() => handleRemoveItem(item._id)}
                      classes={{ root: "custom-button-root" }}
                    >
                      <DeleteForeverIcon
                        classes={{ root: "custom-icon-root" }}
                        sx={{ color: "#264653" }}
                        fontSize="large"
                      />
                    </Button>
                  </div>

                  <div className="cart-prices">
                    <h4
                      style={
                        item.product.onSale
                          ? { textDecoration: "line-through", opacity: 0.7 }
                          : null
                      }
                    >
                      ${item.product.price}
                    </h4>
                    {item.product.onSale && (
                      <h4 style={{ color: "red" }}>
                        ${item.product.salePrice}
                      </h4>
                    )}
                  </div>

                  <p className="cart-item-subtotal">
                    Subtotal: $
                    {parseFloat(
                      (item.product.onSale
                        ? item.product.salePrice
                        : item.product.price) * item.quantity
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="checkout">
            <div className="subtotal-container">
              <p className="subtotal">Subtotal:</p>
              <p className="subtotal-amount">${subtotal.toFixed(2)}</p>
            </div>
            <div className="savings-container" style={{ color: "red" }}>
              <p className="savings">Savings:</p>
              <p className="savings-amount">${savings.toFixed(2)}</p>
            </div>
            <div className="shipping-container">
              <p className="shipping">Shipping:</p>
              <p className="shiping-amount">
                ${shippingRate === 0 ? "0.00" : shippingAmount.toFixed(2)}
              </p>
            </div>
            <div className="tax-container">
              <p className="tax">Est. tax:</p>
              <p className="tax-amount">${taxAmount.toFixed(2)}</p>
            </div>
            <div className="total-container">
              <p className="total">TOTAL:</p>
              <p className="total-amount">${totalCost.toFixed(2)}</p>
            </div>
            {/* Display a message if there are items with Qty 0 in cart */}
            {hasZeroQuantityItem &&
              userCart.some((item) => item.quantity === 0) && (
                <p className="remove-items-message">
                  Remove items with Qty: 0 before checking out.
                </p>
              )}
            <Button
              className="checkout-button"
              sx={{
                color: "white",
                background: "var(--primary-color)",
                borderRadius: "4px",
                padding: ".35em",
                fontWeight: "bold",
                transition: ".4s",
                "&:hover": {
                  color: "var(--primary-color)",
                  backgroundColor: "var(--secondary-color)",
                },
                "&:disabled": {
                  color: "gray", // Change the text color when disabled
                  backgroundColor: "lightgray", // Change the background color when disabled
                  cursor: "not-allowed", // Change the cursor to 'not-allowed' when disabled
                },
              }}
              onClick={handleCheckout}
              disabled={userCart.length === 0 || hasZeroQuantityItem()}
            >
              CHECKOUT
            </Button>
          </div>
        </div>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          message="Item removed from cart"
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        />
        <Snackbar
          open={orderComplete}
          autoHideDuration={3000}
          onClose={() => setOrderComplete(false)}
          message="Order complete! View your order in your account page"
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        />
      </div>
      <Sales
        onProductClick={onProductClick}
        onGoBack={onGoBack}
        previousView={previousView}
        view={view}
        setView={setView}
        isCalledFromCart={true}
      />
    </>
  );
};

export default Cart;
