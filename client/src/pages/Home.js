import React, { useState } from "react";
import MainCategories from "../components/MainCategories/MainCategories";
import SubCategories from "../components/SubCategories/SubCategories";
import Products from "../components/Products/Products";
import Product from "../components/Product/Product";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  console.log("Selected Category:" + selectedCategory);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategory(null);
    setSelectedProduct(null);
  };

  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setSelectedProduct(null);
  };

  const handleProductClick = (product) => {
    console.log("handleProdcutClick prop value: " + product);
    setSelectedProduct(product);
  };

  return (
    <div>
      {!selectedCategory && (
        <MainCategories onCategoryClick={handleCategoryClick} />
      )}
      {selectedCategory && !selectedSubCategory && (
        <SubCategories
          category={selectedCategory}
          onSubCategoryClick={handleSubCategoryClick}
        />
      )}
      {selectedSubCategory && !selectedProduct && (
        <Products
          subCategory={selectedSubCategory}
          onProductClick={handleProductClick}
        />
      )}
      {selectedProduct && <Product productId={selectedProduct} />}
    </div>
  );
};

export default Home;

// In this example, the Home component maintains the state for the currently selected category, subcategory, and product using the useState hook. It also provides callback functions (handleCategoryClick, handleSubCategoryClick, handleProductClick) that will be passed down to the child components as props.

// When a category is clicked in the MainCategories component, the handleCategoryClick function updates the state with the selected category and resets the subcategory and product states. Similarly, when a subcategory is clicked in the SubCategories component, the handleSubCategoryClick function updates the state with the selected subcategory and resets the product state.

// The Products component is rendered when a subcategory is selected, and the Product component is rendered when a product is selected. The selectedCategory, selectedSubCategory, and selectedProduct states are passed down to the child components as props to ensure the correct data is displayed.

// In this updated version, the MainCategories component is conditionally rendered using the negation operator ! before selectedCategory. This means that MainCategories will only be displayed when selectedCategory is null or false.

// Once a category is selected (selectedCategory is truthy), MainCategories will no longer be rendered, and the SubCategories component will be displayed. Similarly, when a subcategory is selected (selectedSubCategory is truthy), the SubCategories component will disappear, and the Products component will be rendered. Finally, when a product is selected (selectedProduct is truthy), the Product component will be displayed, and the other components will not be rendered.

// This way, only one of the four components (MainCategories, SubCategories, Products, or Product) will be visible at any given time based on the selected state.
