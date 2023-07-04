import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER_CART } from "../../utils/queries";
import {
  UPDATE_CART_ITEM_QUANTITY,
  REMOVE_CART_ITEM,
} from "../../utils/mutations";
import AuthService from "../../utils/auth";
import "./Cart.css";

const Cart = () => {
  const [updateCartItemQuantity] = useMutation(UPDATE_CART_ITEM_QUANTITY);
  const [removeCartItem] = useMutation(REMOVE_CART_ITEM);
  const profile = AuthService.getProfile();
  const userId = profile ? profile.data._id : null;

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    try {
      await updateCartItemQuantity({
        variables: { userId, cartItemId, quantity: newQuantity },
        refetchQueries: [{ query: QUERY_USER_CART, variables: { userId } }],
      });
      // Optional: Show success message or perform any other action
    } catch (err) {
      // Handle error
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      await removeCartItem({
        variables: { userId, cartItemId },
        refetchQueries: [{ query: QUERY_USER_CART, variables: { userId } }],
      });
      // Optional: Show success message or perform any other action
    } catch (err) {
      // Handle error
    }
  };

  const { loading, error, data } = useQuery(QUERY_USER_CART, {
    variables: { userId },
  });

  if (loading) {
    return <p>Loading cart data...</p>;
  }

  if (error) {
    return <p>Error retrieving cart data.</p>;
  }

  const userCart = data.userCart;

  let subtotal = 0;
  let shippingRate = 0.03;
  let taxRate = 0.05;

  // Calculate subtotal
  userCart.forEach((item) => {
    const itemSubtotal = parseFloat(item.product.price) * item.quantity;
    subtotal += itemSubtotal;
  });

  const taxAmount = subtotal * taxRate;
  const shippingAmount = subtotal * shippingRate;
  const totalCost = subtotal + shippingAmount + taxAmount;

  return (
    <div className="cart-container">
      <br />
      <h1>{profile.data.username}'s cart</h1>

      <div className="cart-checkout">
        <div className="cart-items">
          {userCart.map((item) => (
            <div key={item._id} className="cart-item">
              {item.option && item.option.image ? (
                <img
                  className="option-image cart-image"
                  src={require(`../../images/${item.option.image}`)}
                  alt="Product"
                />
              ) : (
                <img
                  className="option-image cart-image"
                  src={require(`../../images/${item.product.image}`)}
                  alt="Product"
                />
              )}
              <div className="cart-item-details">
                <p className="cart-item-name">{item.product.name}</p>
                {item.option &&
                  Object.entries(item.option).map(([key, value]) => {
                    if (
                      value &&
                      key !== "__typename" &&
                      key !== "_id" &&
                      key !== "image"
                    ) {
                      return (
                        <p key={key} className="cart-item-options">
                          {key}: {value}
                        </p>
                      );
                    }
                    return null;
                  })}
              </div>

              <div className="cart-qty-price">
                <p className="cart-item-quantity">
                  Quantity:{" "}
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item._id, parseInt(e.target.value))
                    }
                  />
                </p>
                <p className="cart-item-price">${item.product.price}</p>
                <p className="cart-item-subtotal">
                  Subtotal: $
                  {parseFloat(item.product.price * item.quantity).toFixed(2)}
                </p>
                <button
                  className="remove-item-button"
                  onClick={() => handleRemoveItem(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="checkout">
          <p className="subtotal">subtotal: ${subtotal.toFixed(2)}</p>
          <p className="shipping">shipping: ${shippingAmount.toFixed(2)}</p>
          <p className="tax">tax: ${taxAmount.toFixed(2)}</p>
          <p className="total">total: ${totalCost.toFixed(2)}</p>
          <button className="checkout-button">CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
