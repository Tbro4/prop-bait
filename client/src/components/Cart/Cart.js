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
                  Qty:{" "}
                  <input
                    className="qty-input"
                    type="number"
                    min={0}
                    max={99}
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item._id, parseInt(e.target.value))
                    }
                  />
                </p>
                <button
                  className="remove-item-button"
                  onClick={() => handleRemoveItem(item._id)}
                >
                  Remove
                </button>
                <p className="cart-item-price">${item.product.price}</p>
                <p className="cart-item-subtotal">
                  Subtotal: $
                  {parseFloat(item.product.price * item.quantity).toFixed(2)}
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
          <div className="shipping-container">
            <p className="shipping">Shipping:</p>
            <p className="shipping-amount">${shippingAmount.toFixed(2)}</p>
          </div>
          <div className="tax-container">
            <p className="tax">Est. tax:</p>
            <p className="tax-amount">${taxAmount.toFixed(2)}</p>
          </div>
          <div className="total-container">
            <p className="total">TOTAL:</p>
            <p className="total-amount">${totalCost.toFixed(2)}</p>
          </div>
          <button className="checkout-button">CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
