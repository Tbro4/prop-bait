import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCT_BY_ID } from "../../utils/queries";
import "./Product.css";

const Product = ({ productId }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsSmallScreen(mediaQuery.matches);

    const handleScreenChange = (e) => setIsSmallScreen(e.matches);
    mediaQuery.addEventListener("change", handleScreenChange);

    return () => {
      mediaQuery.removeEventListener("change", handleScreenChange);
    };
  }, []);

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

  const handleAddToCart = () => {
    // Add your logic to handle adding the product to the cart here
    console.log("Product added to cart:", product);
  };

  const renderMeasurements = () => {
    if (product?.hasMeasurement) {
      const measurements = Object.entries(product.hasMeasurement).filter(
        ([key, value]) => value !== null && key !== "__typename"
      );

      if (measurements.length > 0) {
        const tableHeaders = measurements.map(([key]) => (
          <th key={key}>{key}</th>
        ));

        const tableData = measurements.map(([, value]) => (
          <td key={value}>{value}</td>
        ));

        if (isSmallScreen) {
          const rows = measurements.map(([key, value]) => (
            <tr key={key}>
              <th>{key}:</th>
              <td>{value}</td>
            </tr>
          ));

          return (
            <div>
              <table>
                <tbody>{rows}</tbody>
              </table>
            </div>
          );
        } else {
          return (
            <div>
              <table>
                <thead>
                  <tr>{tableHeaders}</tr>
                </thead>
                <tbody>
                  <tr>{tableData}</tr>
                </tbody>
              </table>
            </div>
          );
        }
      }
    }
    return null;
  };

  const renderOptions = () => {
    if (product?.options && product.options.length > 0) {
      return (
        <div>
          <h4>Options:</h4>
          <table>
            <thead>
              <tr>
                {product.options[0].image && <th>Image</th>}
                {Object.keys(product.options[0]).map(
                  (key) =>
                    key !== "image" &&
                    key !== "_id" &&
                    key !== "__typename" &&
                    product.options[0][key] !== null && <th key={key}>{key}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {product.options.map((option, index) => (
                <tr key={index}>
                  {option.image && (
                    <td>
                      <img
                        className="option-image"
                        src={require(`../../images/${option.image}`)}
                        alt={option.color}
                      />
                    </td>
                  )}
                  {Object.entries(option).map(
                    ([key, value]) =>
                      key !== "image" &&
                      key !== "_id" &&
                      key !== "__typename" &&
                      value !== null && <td key={key}>{value}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="Singleproduct">
      <div className="Singleproduct-info">
        <div className="Singleproduct-image">
          <img
            src={require(`../../images/${product.image}`)}
            alt={product.name}
          />
        </div>
        <div className="Singleproduct-details">
          <h3>{product.name}</h3>
          <h4>{product.price}</h4>
          <p>Description: {product.description}</p>
        </div>
      </div>
      {renderMeasurements()}
      {renderOptions()}
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;
