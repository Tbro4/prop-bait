import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS_BY_SUBCATEGORY } from "../../utils/queries";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "./Products.css";

const Products = ({ subCategory, onProductClick, onGoBack, previousView }) => {
  const { loading, error, data } = useQuery(QUERY_PRODUCTS_BY_SUBCATEGORY, {
    variables: { subCategory },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const products = data?.productsBySubCategory || [];

  const handleProductClick = (productId) => {
    // Pass the clicked product ID to the parent component
    onProductClick(productId);
  };

  const handleGoBack = () => {
    onGoBack(previousView);
  };

  return (
    <>
      <Button
        className="go-back"
        onClick={handleGoBack}
        style={{ marginTop: "10px" }}
      >
        <ArrowBackIosIcon />
      </Button>
      <h1>{products[0].subCategory}</h1>
      <div className="products">
        {products.map((product) => (
          <div
            key={product._id}
            className="product"
            onClick={() => handleProductClick(product._id)}
          >
            <div className="product-image">
              <img
                src={require(`../../images/${product.image}`)}
                alt={product.name}
              />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <h4>{product.price}</h4>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
