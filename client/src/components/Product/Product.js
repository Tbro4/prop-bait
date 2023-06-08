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

  console.log("Product data with options:", product);

  const handleAddToCart = () => {
    // Add your logic to handle adding the product to the cart here
    console.log("Product added to cart:", product);
  };

  return (
    <div className="product">
      <div className="product-image">
        <img
          src={require(`../../images/${product.image}`)}
          alt={product.name}
        />
      </div>
      <h3>{product.name}</h3>
      <h4>{product.price}</h4>
      <p>Description: {product.description}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;
