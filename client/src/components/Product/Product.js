import React, { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_PRODUCT_BY_ID } from "../../utils/queries";
import { ADD_TO_CART } from "../../utils/mutations";
import "./Product.css";
import AuthService from "../../utils/auth";

const Product = ({ productId }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [optionQuantities, setOptionQuantities] = useState({});
  const [addToCart] = useMutation(ADD_TO_CART);
  //Using this to disable scrolling within a qty field (scroll was causing numbers to change unintentionally)
  const quantityInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = (e) => {
      const { target } = e;
      if (target === quantityInputRef.current) {
        e.preventDefault();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  const handleAddToCart = async () => {
    if (!AuthService.loggedIn()) {
      console.log("Please login/signup");
      return;
    }

    const selectedOptions = product.options.reduce((selected, option) => {
      const quantity = optionQuantities[option._id];
      if (quantity && parseInt(quantity) > 0) {
        selected.push({
          option: option._id,
          quantity: parseInt(quantity),
        });
      }
      return selected;
    }, []);

    if (selectedOptions.length > 0) {
      try {
        const { data } = await addToCart({
          variables: {
            userId: AuthService.getProfile().data._id,
            options: selectedOptions,
          },
        });
        console.log("Options added to cart:", data.addToCart);
      } catch (error) {
        console.log("Error adding to cart:", error);
      }
    } else {
      console.log("No options selected.");
    }
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
                    product.options[0][key] !== null && (
                      <React.Fragment key={key}>
                        <th>{key}</th>
                        <th>Quantity</th>
                      </React.Fragment>
                    )
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
                      value !== null && (
                        <React.Fragment key={key}>
                          <td>{value}</td>
                          <td>
                            <input
                              type="number"
                              min="0"
                              value={optionQuantities[option._id] || ""}
                              onChange={(e) => {
                                const quantity = e.target.value;
                                setOptionQuantities((prevState) => ({
                                  ...prevState,
                                  [option._id]: quantity,
                                }));
                              }}
                              ref={quantityInputRef} // Assign the ref to the input element
                              onWheel={(e) => e.currentTarget.blur()} // Disable scrolling on wheel event
                              // onKeyUp={(e) => e.currentTarget.blur()} // Disable scrolling on key up event
                            />
                          </td>
                        </React.Fragment>
                      )
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
