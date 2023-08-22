import React, { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_PRODUCT_BY_ID } from "../../utils/queries";
import { ADD_TO_CART } from "../../utils/mutations";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import Typography from "@mui/material/Typography";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import InfoIcon from "@mui/icons-material/Info";
import "./Product.css";
import AuthService from "../../utils/auth";
import Snackbar from "@mui/material/Snackbar";

const Product = ({ productId, onGoBack, previousView }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [optionQuantities, setOptionQuantities] = useState({});
  const [addToCart] = useMutation(ADD_TO_CART);

  const [openInfo, setOpenInfo] = useState(false);

  const componentTitle = "Product Measurements";
  const componentDescription =
    " Since products contain different measurement types (there are 18 different types), this product measurement table is dynamically generated based on the product keys that do not contain a 'null' value";

  const handleInfoClick = () => {
    setOpenInfo(true);
  };

  const handleInfoClose = () => {
    setOpenInfo(false);
  };

  const handleOpenSnackbar = (message) => {
    setSnackbarMessage(message);
    setOpen(true);
  };

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const message = !AuthService.loggedIn()
    ? "Please login or signup"
    : snackbarMessage || "Item added to cart";
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
      handleOpenSnackbar("Please login or signup");
      return;
    }

    const selectedOptions = [];

    if (product?.options && product.options.length > 0) {
      // Handle selected options if options exist
      selectedOptions.push(
        ...product.options.reduce((selected, option) => {
          const quantity = optionQuantities[option._id];
          if (quantity && parseInt(quantity) > 0) {
            selected.push({
              option: option._id,
              quantity: parseInt(quantity),
            });
          }
          return selected;
        }, [])
      );
    } else {
      // Handle product without options
      const quantity = optionQuantities["singleOption"];
      if (!quantity || parseInt(quantity) < 1) {
        handleOpenSnackbar("Quantity cannot be zero");
        return;
      }
      selectedOptions.push({
        option: product._id,
        quantity: parseInt(quantity),
      });
    }

    if (selectedOptions.length > 0) {
      try {
        await addToCart({
          variables: {
            userId: AuthService.getProfile().data._id,
            options: selectedOptions,
          },
        });

        handleOpenSnackbar("Item(s) added to cart");
        setOptionQuantities({});
      } catch (error) {
        console.log("Error adding to cart:", error);
      }
    } else {
      handleOpenSnackbar("Please add a quantity greater than zero");
    }
  };

  const handleGoBack = () => {
    onGoBack(previousView);
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
              <th>{key}</th>
              <td>{value}</td>
            </tr>
          ));

          return (
            <div className="measurements-table">
              <table>
                <tbody>{rows}</tbody>
              </table>
              <InfoIcon
                sx={{
                  marginLeft: "15px",
                  marginTop: "15px",
                  cursor: "pointer",
                  fill: "#2a9d8f",
                  "&:hover": {
                    color: "var(--primary-color)",
                    fill: "var(--secondary-color)",
                  },
                }}
                onClick={handleInfoClick}
              />
              <Dialog
                open={openInfo}
                onClose={handleInfoClose}
                PaperProps={{
                  sx: { bgcolor: "#c7e5e1", border: "3px solid #2a9d8f" },
                }}
              >
                <DialogTitle style={{ textAlign: "center" }}>
                  {componentTitle}
                </DialogTitle>
                <DialogContent>
                  <Typography
                    variant="body1"
                    style={{ lineHeight: "1.5", marginBottom: "10px" }}
                  >
                    {componentDescription}
                  </Typography>
                </DialogContent>
              </Dialog>
            </div>
          );
        } else {
          return (
            <div className="measurements-table">
              <table>
                <thead>
                  <tr>{tableHeaders}</tr>
                </thead>
                <tbody>
                  <tr>{tableData}</tr>
                </tbody>
              </table>
              <InfoIcon
                sx={{
                  marginLeft: "15px",
                  marginTop: "15px",
                  cursor: "pointer",
                  fill: "#2a9d8f",
                  "&:hover": {
                    color: "var(--primary-color)",
                    fill: "var(--secondary-color)",
                  },
                }}
                onClick={handleInfoClick}
              />
              <Dialog
                open={openInfo}
                onClose={handleInfoClose}
                PaperProps={{
                  sx: { bgcolor: "#c7e5e1", border: "3px solid #2a9d8f" },
                }}
              >
                <DialogTitle style={{ textAlign: "center" }}>
                  {componentTitle}
                </DialogTitle>
                <DialogContent>
                  <Typography
                    variant="body1"
                    style={{ lineHeight: "1.5", marginBottom: "10px" }}
                  >
                    {componentDescription}
                  </Typography>
                </DialogContent>
              </Dialog>
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
        <div className="multiple-options">
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
                      </React.Fragment>
                    )
                )}
                <th>Quantity</th>
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
                          <td className="table-data">{value}</td>
                        </React.Fragment>
                      )
                  )}
                  <td>
                    <input
                      className="qty-input"
                      type="number"
                      min="0"
                      max="99"
                      value={optionQuantities[option._id] || ""}
                      onChange={(e) => {
                        let quantity = e.target.value;
                        // Ensure the quantity is within the valid range
                        if (quantity > 99) {
                          quantity = 99;
                        }
                        setOptionQuantities((prevState) => ({
                          ...prevState,
                          [option._id]: quantity,
                        }));
                      }}
                      ref={quantityInputRef}
                      onWheel={(e) => e.currentTarget.blur()}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button
            onClick={handleAddToCart}
            className="add-to-cart-btn multi-opt-btn"
          >
            <AddShoppingCartIcon
              fontSize="large"
              sx={{
                color: "var(--secondary-color)",
                background: "var(--primary-color)",
                borderRadius: "4px",
                padding: "3px",
                width: "100%",

                transition: ".4s",
                "&:hover": {
                  color: "var(--primary-color)",
                  backgroundColor: "var(--secondary-color)",
                },
              }}
            />
          </Button>
        </div>
      );
    } else {
      // Render a single quantity field if no options exist
      return (
        <div className="qty">
          <label>Qty:</label>
          <input
            className="qty-input"
            type="number"
            min="0"
            max="99"
            value={optionQuantities["singleOption"] || ""}
            onChange={(e) => {
              let quantity = e.target.value;
              if (quantity > 99) {
                quantity = 99;
              }
              setOptionQuantities((prevState) => ({
                ...prevState,
                singleOption: quantity,
              }));
            }}
            ref={quantityInputRef}
            onWheel={(e) => e.currentTarget.blur()}
          />
          <Button onClick={handleAddToCart} className="add-to-cart-btn">
            <AddShoppingCartIcon
              fontSize="large"
              sx={{
                color: "var(--secondary-color)",
                background: "var(--primary-color)",
                borderRadius: "4px",
                padding: "2px",
                transition: ".4s",
                "&:hover": {
                  color: "var(--primary-color)",
                  backgroundColor: "var(--secondary-color)",
                },
              }}
            />
          </Button>
        </div>
      );
    }
  };

  return (
    <div className="single-product">
      <Button
        className="go-back"
        onClick={handleGoBack}
        style={{ marginTop: "10px", marginLeft: "-1em" }}
      >
        <ArrowBackIosIcon
          fontSize="large"
          sx={{
            color: "var(--secondary-color)",
            background: "var(--primary-color)",
            borderRadius: "4px",
            paddingLeft: ".25em",
            transition: ".4s",
            "&:hover": {
              color: "var(--primary-color)",
              backgroundColor: "var(--secondary-color)",
            },
          }}
        />
      </Button>
      <div className="single-info">
        <div className="single-image-name-price">
          <div className="single-image">
            <img
              src={require(`../../images/${product.image}`)}
              alt={product.name}
            />
          </div>
          <div className="single-details">
            <div className="single-name-price">
              <h3 className="single-name">{product.name}</h3>
              <div className="single-prices">
                <h4
                  className="single-price"
                  style={
                    product.onSale
                      ? { textDecoration: "line-through", opacity: 0.7 }
                      : null
                  }
                >
                  ${product.price}
                </h4>
                {product.onSale && (
                  <h4 className="single-sale-price" style={{ color: "red" }}>
                    ${product.salePrice}
                  </h4>
                )}
              </div>
            </div>
          </div>
        </div>
        <p className="single-description">{product.description}</p>
      </div>
      {renderMeasurements()}

      {renderOptions()}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={message}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </div>
  );
};

export default Product;
