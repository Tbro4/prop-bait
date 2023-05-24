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
  onGoBack,
}) => {
  const handleGoBack = () => {
    onGoBack(previousView);
  };

  return (
    <div>
      {view !== "mainCategories" && (
        <>
          <button onClick={handleGoBack} style={{ marginTop: "10px" }}>
            Go Back
          </button>
        </>
      )}
      {view === "mainCategories" && (
        <MainCategories onCategoryClick={onCategoryClick} />
      )}
      {view === "subCategories" && (
        <SubCategories
          category={selectedCategory}
          onSubCategoryClick={onSubCategoryClick}
          onProductClick={onProductClick}
        />
      )}
      {view === "products" && (
        <Products
          subCategory={selectedSubCategory}
          onProductClick={onProductClick}
        />
      )}
      {view === "product" && <Product productId={selectedProduct} />}
    </div>
  );
};

export default Home;
