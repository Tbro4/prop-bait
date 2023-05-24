import React, { useState } from "react";
import Home from "../../pages/Home";
import AppBarTop from "../AppBarTop/AppBarTop";
import AppBarBottom from "../AppBarBottom/AppBarBottom";

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
    <div>
      <AppBarTop />
      <AppBarBottom view={view} onViewChange={setView} />
      <Home
        view={view}
        selectedCategory={selectedCategory}
        selectedSubCategory={selectedSubCategory}
        selectedProduct={selectedProduct}
        onCategoryClick={handleCategoryClick}
        onSubCategoryClick={handleSubCategoryClick}
        onProductClick={handleProductClick}
        onGoBack={handleGoBack}
        onResetView={handleResetView}
      />
    </div>
  );
};

export default AppContainer;
