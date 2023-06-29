import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER_CART } from "../../utils/queries";
import AuthService from "../../utils/auth";
import "./Cart.css";

const Cart = () => {
  const profile = AuthService.getProfile();
  console.log(profile.data);
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

  console.log(data);

  const userCart = data.userCart;

  return (
    <div className="App">
      <br />
      <br />
      <br />
      <br />
      <h1>{profile.data.username}'s cart </h1>

      {userCart.map((item) => (
        <div key={item._id}>
          {item.option && item.option.image ? (
            <img
              className="option-image"
              src={require(`../../images/${item.option.image}`)}
              alt="Product"
            />
          ) : (
            <img
              className="option-image"
              src={require(`../../images/${item.product.image}`)}
              alt="Product"
            />
          )}
          <p>{item.product.name}</p>
          {item.option &&
            Object.entries(item.option).map(([key, value]) => {
              if (
                value &&
                key !== "__typename" &&
                key !== "_id" &&
                key !== "image"
              ) {
                return (
                  <p key={key}>
                    {key}: {value}
                  </p>
                );
              }
              return null;
            })}
          <p>Price: {item.product.price}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
    </div>
  );
};

export default Cart;
