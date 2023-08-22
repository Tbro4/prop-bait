import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS_BY_SUBCATEGORY } from "../../utils/queries";
import {
  Button,
  Drawer,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import InfoIcon from "@mui/icons-material/Info";
import "./Products.css";

const Products = ({ subCategory, onProductClick, onGoBack, previousView }) => {
  const { loading, error, data } = useQuery(QUERY_PRODUCTS_BY_SUBCATEGORY, {
    variables: { subCategory },
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const [open, setOpen] = useState(false);

  const componentTitle = "Filter & Sort";
  const componentDescription =
    "There are three common sort options available. The filter options are dynamically generated based on the available brands and categories currently displayed in the component. In the future, I may add the ability to filter by different product measurements such as size, weight, and length.";

  const handleInfoClick = () => {
    setOpen(true);
  };

  const handleInfoClose = () => {
    setOpen(false);
  };

  const [selectedSortOption, setSelectedSortOption] = useState("");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const products = data?.productsBySubCategory || [];

  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const uniqueBrands = [...new Set(products.map((product) => product.brand))];

  const handleProductClick = (productId) => {
    // Pass the clicked product ID to the parent component
    onProductClick(productId);
  };

  const handleBrandChange = (e) => {
    const brand = e.target.value;
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(
        selectedBrands.filter((selectedBrand) => selectedBrand !== brand)
      );
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handleSortChange = (e) => {
    setSelectedSortOption(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false; // Skip if the brand doesn't match the selected brands
    }

    return true; // Include the product in the filtered list
  });

  //we map over sortedProducts in the return to display the filtered/sorted products
  let sortedProducts = [...filteredProducts];

  if (selectedSortOption === "price-desc") {
    sortedProducts.sort((a, b) => b.price - a.price); // Sort by price high to low
  } else if (selectedSortOption === "price-asc") {
    sortedProducts.sort((a, b) => a.price - b.price); // Sort by price low to high
  } else if (selectedSortOption === "name-asc") {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name)); // Sort by name A-Z
  }

  const handleGoBack = () => {
    onGoBack(previousView);
  };

  return (
    <>
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
      <Button
        className="filter-sort-btn"
        style={{ marginTop: "10px", paddingLeft: "8px", paddingRight: "8px" }}
        onClick={handleFilterToggle}
        sx={{
          color: "var(--secondary-color)",
          background: "var(--primary-color)",
          borderRadius: "4px",
          padding: ".35em",
          fontWeight: "bold",
          transition: ".4s",
          "&:hover": {
            color: "var(--primary-color)",
            backgroundColor: "var(--secondary-color)",
          },
        }}
      >
        Filter & Sort
      </Button>
      <Drawer
        anchor="left"
        open={isFilterOpen}
        onClose={handleFilterToggle}
        PaperProps={{
          style: {
            paddingTop: "1em",
            paddingRight: "1em",
            paddingLeft: "1em",
          },
          sx: {
            background: "#c7e5e1",
          },
        }}
      >
        <div className="sort-filter">
          <select
            id="sortBy"
            value={selectedSortOption}
            onChange={handleSortChange}
          >
            <option value="" disabled hidden>
              Sort
            </option>
            <option value="price-desc">Price High to Low</option>
            <option value="price-asc">Price Low to High</option>
            <option value="name-asc">A-Z</option>
          </select>

          <InfoIcon
            sx={{
              marginLeft: "15px",
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
            open={open}
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

          <div className="filter">
            <div className="filter-title">
              <h3>-Brand</h3>
              {selectedBrands.length > 0 && (
                <button
                  className="clear-button"
                  onClick={() => setSelectedBrands([])}
                >
                  Clear
                </button>
              )}
            </div>
            {uniqueBrands.map((brand) => (
              <label key={brand}>
                <input
                  type="checkbox"
                  value={brand}
                  checked={selectedBrands.includes(brand)}
                  onChange={handleBrandChange}
                />
                {brand}
              </label>
            ))}
          </div>
        </div>
      </Drawer>
      <h1>{products[0].subCategory}</h1>
      <div className="products">
        {sortedProducts.map((product) => (
          <div key={product._id} className="product">
            <div className="product-image">
              <img
                src={require(`../../images/${product.image}`)}
                alt={product.name}
                onClick={() => handleProductClick(product._id)}
              />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <div className="prices">
                <h4
                  style={
                    product.onSale
                      ? { textDecoration: "line-through", opacity: 0.7 }
                      : null
                  }
                >
                  {product.price}
                </h4>
                {product.onSale && (
                  <h4 style={{ color: "red" }}>{product.salePrice}</h4>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
