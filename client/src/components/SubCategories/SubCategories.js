import React from "react";
import { useQuery } from "@apollo/client";
import {
  QUERY_SUBCATEGORIES_BY_CATEGORY,
  QUERY_PRODUCTS_BY_CATEGORY,
} from "../../utils/queries";
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

  const handleSubCategoryClick = (subCategory) => {
    onSubCategoryClick(subCategory);
  };

  const handleProductClick = (productId) => {
    onProductClick(productId);
  };

  return (
    <>
      <div className="sub-categories">
        {subCategories.map((subCategory) => (
          <div
            key={subCategory._id}
            onClick={() => handleSubCategoryClick(subCategory.subCategory)}
          >
            <h3>{subCategory.subCategory}</h3>
          </div>
        ))}
      </div>
      <h1>{subCategories[0].category}</h1>
      <div className="products">
        {products.map((product) => (
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
    </>
  );
};

export default SubCategories;
