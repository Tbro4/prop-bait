import React from "react";
import { useQuery } from "@apollo/client";
import {
  QUERY_PRODUCTS_BY_KEYWORD,
  QUERY_PRODUCTS_BY_SEARCH,
} from "../../utils/queries";
import "./ProductSearch.css";

const ProductSearch = ({ keyword }) => {
  const { loading, error, data } = useQuery(QUERY_PRODUCTS_BY_KEYWORD, {
    variables: { keyword },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const products = data?.productsBySearch || [];

  const handleProductClick = (productId) => {
    // Handle the click event for a product (e.g., navigate to product details page)
    console.log("Product clicked:", productId);
  };

  return (
    <>
      <h1>Search Results</h1>
      <div className="products">
        {products.map((product) => (
          <div
            key={product._id}
            onClick={() => handleProductClick(product._id)}
          >
            <h3>{product.name}</h3>
            <img
              src={require(`../../images/${product.image}`)}
              alt={product.name}
            />
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductSearch;
