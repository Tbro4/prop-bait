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
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState("");

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
  // console.log(products);
  const uniqueSubCategories = [
    ...new Set(products.map((product) => product.subCategory)),
  ];
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

  const handleSubCategoryChange = (e) => {
    const subCategory = e.target.value;
    if (selectedSubCategories.includes(subCategory)) {
      setSelectedSubCategories(
        selectedSubCategories.filter(
          (selectedSubCategory) => selectedSubCategory !== subCategory
        )
      );
    } else {
      setSelectedSubCategories([...selectedSubCategories, subCategory]);
    }
  };

  const handleSortChange = (e) => {
    setSelectedSortOption(e.target.value);
  };

  //we map over filteredProducts in the return to display the filtered products
  const filteredProducts = products.filter((product) => {
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false; // Skip if the brand doesn't match the selected brands
    }
    if (
      selectedSubCategories.length > 0 &&
      !selectedSubCategories.includes(product.subCategory)
    ) {
      return false; // Skip if the subcategory doesn't match the selected subcategories
    }
    return true; // Include the product in the filtered list
  });

  let sortedProducts = [...filteredProducts];

  if (selectedSortOption === "price-desc") {
    sortedProducts.sort((a, b) => b.price - a.price); // Sort by price high to low
  } else if (selectedSortOption === "price-asc") {
    sortedProducts.sort((a, b) => a.price - b.price); // Sort by price low to high
  } else if (selectedSortOption === "name-asc") {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name)); // Sort by name A-Z
  }

  return (
    <div className="sub-cat">
      <div className="sub-categories">
        {subCategories.map((subCategory) => (
          <div
            className="sub-names"
            key={subCategory._id}
            onClick={() => handleSubCategoryClick(subCategory.subCategory)}
          >
            <h3>{subCategory.subCategory}</h3>
          </div>
        ))}
      </div>
      {/* Button to toggle filter */}
      <Button onClick={handleFilterToggle}>Toggle Filter</Button>
      <Drawer
        anchor="left"
        open={isFilterOpen}
        onClose={handleFilterToggle}
        PaperProps={{
          style: {
            paddingTop: "1em",
            paddingRight: "1em",
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
            <div className="filter-title">
              <h3>-Category</h3>
              {selectedSubCategories.length > 0 && (
                <button
                  className="clear-button"
                  onClick={() => setSelectedSubCategories([])}
                >
                  Clear
                </button>
              )}
            </div>
            {uniqueSubCategories.map((subcategory) => (
              <label key={subcategory}>
                <input
                  type="checkbox"
                  value={subcategory}
                  checked={selectedSubCategories.includes(subcategory)}
                  onChange={handleSubCategoryChange}
                />
                {subcategory}
              </label>
            ))}
          </div>
        </div>
      </Drawer>
      <h1>{subCategories[0].category}</h1>
      <div className="products">
        {filteredProducts.length === 0 ? (
          <div>No options available with those filters chosen</div>
        ) : (
          sortedProducts.map((product) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default SubCategories;
