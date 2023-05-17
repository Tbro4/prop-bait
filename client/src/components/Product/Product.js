import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCT_BY_ID } from "../../utils/queries";

const Product = ({ productId }) => {
  const { loading, error, data } = useQuery(QUERY_PRODUCT_BY_ID, {
    variables: { productId },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const product = data?.productById;

  return (
    <div>
      <h3>{product.name}</h3>
      <img src={require(`../../images/${product.image}`)} alt={product.name} />
      <p>Price: {product.price}</p>
      <p>Description: {product.description}</p>
    </div>
  );
};

export default Product;
