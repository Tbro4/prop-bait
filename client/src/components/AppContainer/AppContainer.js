import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Home from "../../pages/Home";
import AppBarTop from "../AppBarTop/AppBarTop";
import AppBarBottom from "../AppBarBottom/AppBarBottom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2a9d8f",
    },
    secondary: {
      main: "#c7e5e1",
    },
    custom: {
      main: "#264653",
    },
  },
});

const AppContainer = () => {
  const [view, setView] = useState("mainCategories");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [previousViews, setPreviousViews] = useState([]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategory(null);
    setSelectedProduct(null);
    setPreviousViews((prevViews) => [...prevViews, view]);
    setView("subCategories");
  };

  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setSelectedProduct(null);
    setPreviousViews((prevViews) => [...prevViews, view]);
    setView("products");
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setPreviousViews((prevViews) => [...prevViews, view]);
    setView("product");
  };

  const handleSalesClick = () => {
    setPreviousViews((prevViews) => [...prevViews, view]);
    setView("sales");
  };

  const handleGoBack = () => {
    if (previousViews.length > 0) {
      const prevView = previousViews.pop();
      setPreviousViews([...previousViews]);
      setView(prevView);
    }
  };

  const handleResetView = () => {
    setView("mainCategories");
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setSelectedProduct(null);
    setPreviousViews([]);
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        //CSS files can access these styles
        style={{
          "--primary-color": theme.palette.primary.main,
          "--secondary-color": theme.palette.secondary.main,
          "--custom-color": theme.palette.custom.main,
        }}
      >
        <AppBarTop
          onCategoryClick={handleCategoryClick}
          onSubCategoryClick={handleSubCategoryClick}
          onProductClick={handleProductClick}
          onResetView={handleResetView}
        />
        <AppBarBottom view={view} setView={setView} />
        <Home
          view={view}
          setView={setView}
          selectedCategory={selectedCategory}
          selectedSubCategory={selectedSubCategory}
          selectedProduct={selectedProduct}
          onCategoryClick={handleCategoryClick}
          onSubCategoryClick={handleSubCategoryClick}
          onProductClick={handleProductClick}
          handleSalesClick={handleSalesClick}
          onGoBack={handleGoBack}
          onResetView={handleResetView}
        />
      </div>
    </ThemeProvider>
  );
};

export default AppContainer;
