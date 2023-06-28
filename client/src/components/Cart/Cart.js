import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER_CART } from "../../utils/queries";
import AuthService from "../../utils/auth";

const Cart = () => {
  const profile = AuthService.getProfile();
  console.log(profile.data._id);
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

  return (
    <div className="App">
      <br />
      <br />
      <br />
      <br />
      <h1>Cart Page</h1>
    </div>
  );
};

export default Cart;
