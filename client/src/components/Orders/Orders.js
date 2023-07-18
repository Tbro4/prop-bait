import React, { useEffect } from "react";
import { useQuery, useApolloClient } from "@apollo/client";
import Button from "@mui/material/Button";
import { QUERY_USER_ORDERS, QUERY_USER_ORDER_CART } from "../../utils/queries";
import AuthService from "../../utils/auth";

const Orders = () => {
  const profile = AuthService.getProfile();
  const userId = profile ? profile.data._id : null;
  const { loading, error, data } = useQuery(QUERY_USER_ORDERS, {
    variables: { userId },
  });

  const client = useApolloClient();

  useEffect(() => {
    if (data) {
      console.log(data.userOrders);
    }
  }, [data]);

  const handleOrderClick = async (orderId) => {
    const { data } = await client.query({
      query: QUERY_USER_ORDER_CART,
      variables: { orderId },
    });
    console.log(data.userOrderCart);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Your Orders</h1>
      {data.userOrders.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {data.userOrders.map((order) => (
            <li key={order._id}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOrderClick(order._id)}
              >
                {formatFriendlyDate(order.createdAt)}
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

const formatFriendlyDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const timestamp = parseInt(dateString);
  return new Date(timestamp).toLocaleDateString(undefined, options);
};

export default Orders;
