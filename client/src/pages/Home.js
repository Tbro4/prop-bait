import React from "react";
import MainCategories from "../components/MainCategories/MainCategories";
import SubCategories from "../components/SubCategories/SubCategories";
import Products from "../components/Products/Products";
import Product from "../components/Product/Product";
import Cart from "../components/Cart/Cart";
import Account from "../components/Account/Account";
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";

const Home = ({
  view,
  setView,
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
  console.log("View: " + view);

  return (
    <div>
      {view !== "mainCategories" &&
        view !== "account" &&
        view !== "cart" &&
        view !== "login" &&
        view !== "signup" && (
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

      {view === "cart" && <Cart view={view} setView={setView} />}

      {view === "account" && <Account view={view} setView={setView} />}

      {view === "login" && <Login view={view} setView={setView} />}

      {view === "signup" && <Signup view={view} setView={setView} />}
    </div>
  );
};

export default Home;
