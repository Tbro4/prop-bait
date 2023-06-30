import React, { useEffect, useRef } from "react";
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

  const cartContainerRef = useRef(null);

  useEffect(() => {
    if (cartContainerRef.current) {
      const cartItems =
        cartContainerRef.current.getElementsByClassName("cart-item-details");
      let maxWidth = 0;

      for (let i = 0; i < cartItems.length; i++) {
        const width = cartItems[i].offsetWidth;
        maxWidth = Math.max(maxWidth, width);
      }

      for (let i = 0; i < cartItems.length; i++) {
        cartItems[i].style.width = `${maxWidth}px`;
      }
    }
  }, [data]);

  if (loading) {
    return <p>Loading cart data...</p>;
  }

  if (error) {
    return <p>Error retrieving cart data.</p>;
  }

  const userCart = data.userCart;

  return (
    <div className="cart-container" ref={cartContainerRef}>
      <br />
      <h1>{profile.data.username}'s cart</h1>

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
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
