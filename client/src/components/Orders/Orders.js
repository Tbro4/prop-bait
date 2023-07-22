import React, { useEffect, useState } from "react";
import { useQuery, useApolloClient } from "@apollo/client";
import Button from "@mui/material/Button";
import { QUERY_USER_ORDERS, QUERY_USER_ORDER_CART } from "../../utils/queries";
import AuthService from "../../utils/auth";
import "./Orders.css";

const Orders = () => {
  const profile = AuthService.getProfile();
  const userId = profile ? profile.data._id : null;
  const { loading, error, data, refetch } = useQuery(QUERY_USER_ORDERS, {
    variables: { userId },
  });

  useEffect(() => {
    refetch();
  }, [refetch, userId]);

  const client = useApolloClient();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDisplayId, setOrderDisplayId] = useState("");
  const [orderDisplayDate, setOrderDisplayDate] = useState("");

  useEffect(() => {
    if (data) {
      console.log(data.userOrders);
    }
  }, [data]);

  const formatDate = (dateString) => {
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

  const handleOrderClick = async (orderId, createdAt) => {
    const { data } = await client.query({
      query: QUERY_USER_ORDER_CART,
      variables: { orderId },
    });
    setSelectedOrder(data.userOrderCart);

    setOrderDisplayId(orderId);
    setOrderDisplayDate(createdAt);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const calculateSubtotal = (items) => {
    let subtotal = 0;
    items.forEach((item) => {
      const price = item.product.onSale
        ? item.product.salePrice
        : item.product.price;
      subtotal += price * item.quantity;
    });
    return subtotal;
  };

  const calculateTotalSavings = (items) => {
    let totalSavings = 0;
    items.forEach((item) => {
      if (item.product.onSale) {
        const price = item.product.price;
        const salePrice = item.product.salePrice;
        const savingsAmount = price - salePrice;
        totalSavings += savingsAmount * item.quantity;
      }
    });
    return totalSavings;
  };

  const calculateShipping = (subtotal) => {
    const shippingRate = 0.03;
    return subtotal * shippingRate;
  };

  const calculateTax = (subtotal) => {
    const taxRate = 0.05;
    return subtotal * taxRate;
  };

  const calculateTotal = (subtotal, shipping, tax) => {
    return subtotal + shipping + tax;
  };

  return (
    <div
      className="order-page"
      style={{ marginBottom: "15em", marginTop: "3em" }}
    >
      <h1>Your Orders</h1>
      {data.userOrders.length > 0 ? (
        <div className="order-buttons-wrapper">
          {data.userOrders.map((order) => (
            <Button
              key={order._id}
              variant="contained"
              color="primary"
              onClick={() => handleOrderClick(order._id, order.createdAt)}
              style={{ marginRight: "10px" }}
            >
              {formatDate(order.createdAt)}
            </Button>
          ))}
        </div>
      ) : (
        <p>No orders found.</p>
      )}
      {selectedOrder && (
        <div className="order-items">
          <h3>Order # </h3>
          <h2>{orderDisplayId}</h2>
          <h3>Placed on</h3>
          <h2>{formatDate(orderDisplayDate)}</h2>
          {selectedOrder.map((item) => (
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
                  <p className="cart-item-quantity">Qty: {item.quantity}</p>
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
                    <h4 style={{ color: "red" }}>${item.product.salePrice}</h4>
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
          <div className="checkout order-checkout">
            <div className="subtotal-container">
              <p className="subtotal">Subtotal:</p>
              <p className="subtotal-amount">
                ${calculateSubtotal(selectedOrder).toFixed(2)}
              </p>
            </div>
            <div className="savings-container" style={{ color: "red" }}>
              <p className="savings">Savings:</p>
              <p className="savings-amount">
                ${calculateTotalSavings(selectedOrder).toFixed(2)}
              </p>
            </div>
            <div className="shipping-container">
              <p className="shipping">Shipping:</p>
              <p className="shipping-amount">
                $
                {calculateShipping(calculateSubtotal(selectedOrder)).toFixed(2)}
              </p>
            </div>
            <div className="tax-container">
              <p className="tax">Est. tax:</p>
              <p className="tax-amount">
                ${calculateTax(calculateSubtotal(selectedOrder)).toFixed(2)}
              </p>
            </div>
            <div className="total-container">
              <p className="total">TOTAL:</p>
              <p className="total-amount">
                $
                {calculateTotal(
                  calculateSubtotal(selectedOrder),
                  calculateShipping(calculateSubtotal(selectedOrder)),
                  calculateTax(calculateSubtotal(selectedOrder))
                ).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
