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

  const renderMeasurements = () => {
    if (product?.hasMeasurement) {
      const measurements = Object.entries(product.hasMeasurement).filter(
        ([key, value]) => value !== null
      );

      if (measurements.length > 0) {
        return (
          <div>
            <h4>Measurements:</h4>
            <table>
              <tbody>
                {measurements.map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
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
                        src={require(`../../images/${option.image}`)}
                        alt={option.color}
                      />
                    </td>
                  )}
                  {Object.entries(option).map(
                    ([key, value]) =>
                      key !== "image" &&
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
