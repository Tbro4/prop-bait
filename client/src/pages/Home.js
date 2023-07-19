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
import Orders from "../components/Orders/Orders";

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
  handleSalesClick,
  onGoBack,
}) => {
  // Define a common style for the components' container with margin-top
  const componentContainerStyle = {
    marginTop: "52px", // Adjust the value as needed
  };
  return (
    <div style={componentContainerStyle}>
      {view === "mainCategories" && (
        <MainCategories
          onCategoryClick={onCategoryClick}
          handleSalesClick={handleSalesClick}
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
        <Cart
          onProductClick={onProductClick}
          view={view}
          setView={setView}
          onGoBack={onGoBack}
          previousView={previousView}
        />
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
          isCalledFromCart={false}
        />
      )}

      {view === "orders" && <Orders view={view} setView={setView} />}
    </div>
  );
};

export default Home;
