import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  QUERY_SUBCATEGORIES_BY_CATEGORY,
  QUERY_PRODUCTS_BY_CATEGORY,
} from "../../utils/queries";
import { Button, Drawer } from "@mui/material";
import "./SubCategories.css";

const SubCategories = ({ category, onSubCategoryClick, onProductClick }) => {
  const {
    loading: subCategoryLoading,
    error: subCategoryError,
    data: subCategoryData,
  } = useQuery(QUERY_SUBCATEGORIES_BY_CATEGORY, {
    variables: { category },
  });

  const {
    loading: productsLoading,
    error: productsError,
    data: productsData,
  } = useQuery(QUERY_PRODUCTS_BY_CATEGORY, {
    variables: { category },
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  if (subCategoryLoading || productsLoading) {
    return <div>Loading...</div>;
  }

  if (subCategoryError || productsError) {
    return (
      <div>
        Error: {subCategoryError && subCategoryError.message}
        {productsError && productsError.message}
      </div>
    );
  }

  const subCategories = subCategoryData?.subCategoryByCategory || [];
  const products = productsData?.productsByCategory || [];
  const uniqueBrands = [...new Set(products.map((product) => product.brand))];

  const handleSubCategoryClick = (subCategory) => {
    onSubCategoryClick(subCategory);
  };

  const handleProductClick = (productId) => {
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

  const filteredProducts =
    selectedBrands.length > 0
      ? products.filter((product) => selectedBrands.includes(product.brand))
      : products;

  return (
    <div className="sub-cat">
      <div className="sub-categories">
        {subCategories.map((subCategory) => (
          <div
            key={subCategory._id}
            onClick={() => handleSubCategoryClick(subCategory.subCategory)}
          >
            <h3>{subCategory.subCategory}</h3>
          </div>
        ))}
        {/* Button to toggle filter */}
        <Button onClick={handleFilterToggle}>Toggle Filter</Button>
      </div>
      <Drawer anchor="left" open={isFilterOpen} onClose={handleFilterToggle}>
        <div className="sort-filter">
          <select id="sortBy" value="">
            <option value="" disabled hidden>
              Sort
            </option>
            <option value="price">Price</option>
            <option value="az">A-Z</option>
          </select>

          <div className="filter">
            <h3>-Brand</h3>
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
      <h1>{subCategories[0].category}</h1>
      <div className="products">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="product"
            onClick={() => handleProductClick(product._id)}
          >
            <div className="product-image">
              <img
                src={require(`../../images/${product.image}`)}
                alt={product.product}
              />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <h4>{product.price}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubCategories;
