import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER_CART } from "../../utils/queries";
import AuthService from "../../utils/auth";
import "./Cart.css";

const Cart = () => {
  const profile = AuthService.getProfile();
  const userId = profile ? profile.data._id : null;

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
                <p className="cart-item-quantity">Quantity: {item.quantity}</p>
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
          <p>subtotal</p>
          <p>shipping</p>
          <p>tax</p>
          <p>total</p>
          <button>CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
