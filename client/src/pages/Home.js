import React from "react";
import MainCategories from "../components/MainCategories/MainCategories";
import SubCategories from "../components/SubCategories/SubCategories";
import Products from "../components/Products/Products";
import Product from "../components/Product/Product";
import Cart from "../components/Cart/Cart";
import Account from "../components/Account/Account";
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import Sales from "../components/Sales/Sales";

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
  return (
    <div>
      {view === "mainCategories" && (
        <MainCategories
          onCategoryClick={onCategoryClick}
          view={view}
          setView={setView}
        />
      )}

      {view === "subCategories" && (
        <SubCategories
          category={selectedCategory}
          onSubCategoryClick={onSubCategoryClick}
          onProductClick={onProductClick}
          onGoBack={onGoBack}
          previousView={previousView}
        />
      )}

      {view === "products" && (
        <Products
          subCategory={selectedSubCategory}
          onProductClick={onProductClick}
          onGoBack={onGoBack}
          previousView={previousView}
        />
      )}

      {view === "product" && (
        <Product
          productId={selectedProduct}
          onGoBack={onGoBack}
          previousView={previousView}
        />
      )}

      {view === "cart" && (
        <Cart onProductClick={onProductClick} view={view} setView={setView} />
      )}

      {view === "account" && <Account view={view} setView={setView} />}

      {view === "login" && <Login view={view} setView={setView} />}

      {view === "signup" && <Signup view={view} setView={setView} />}

      {view === "sales" && (
        <Sales
          onProductClick={onProductClick}
          onGoBack={onGoBack}
          previousView={previousView}
          view={view}
          setView={setView}
        />
      )}
    </div>
  );
};

export default Home;
