import React from "react";
import MainCategories from "../components/MainCategories/MainCategories";
import SubCategories from "../components/SubCategories/SubCategories";
import Products from "../components/Products/Products";
import Product from "../components/Product/Product";

const Home = ({
  view,
  selectedCategory,
  selectedSubCategory,
  selectedProduct,
  previousView,
  onCategoryClick,
  onSubCategoryClick,
  onProductClick,
  onResetView,
  onGoBack,
}) => {
  const handleGoBack = () => {
    onGoBack(previousView);
  };

  return (
    <div>
      {view === "mainCategories" && (
        <MainCategories onCategoryClick={onCategoryClick} />
      )}
      {view === "subCategories" && (
        <SubCategories
          category={selectedCategory}
          onSubCategoryClick={onSubCategoryClick}
        />
      )}
      {view === "products" && (
        <Products
          subCategory={selectedSubCategory}
          onProductClick={onProductClick}
        />
      )}
      {view === "product" && <Product productId={selectedProduct} />}
      {view !== "mainCategories" && (
        <>
          <button onClick={handleGoBack}>Go Back</button>
          <div style={{ paddingBottom: "20px", marginBottom: "40px" }}></div>
        </>
      )}
    </div>
  );
};

export default Home;
