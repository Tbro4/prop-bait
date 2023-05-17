import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_SUBCATEGORIES_BY_CATEGORY } from "../../utils/queries";

const SubCategories = ({ category, onSubCategoryClick }) => {
  const { loading, error, data } = useQuery(QUERY_SUBCATEGORIES_BY_CATEGORY, {
    variables: { category },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const subCategories = data?.subCategoryByCategory || [];

  const handleSubCategoryClick = (subCategory) => {
    onSubCategoryClick(subCategory);
  };

  return (
    <div>
      {subCategories.map((subCategory) => (
        <div
          key={subCategory._id}
          onClick={() => handleSubCategoryClick(subCategory.subCategory)}
        >
          <h3>{subCategory.subCategory}</h3>

          <img
            src={require(`../../images/${subCategory.image}`)}
            alt={subCategory.subCategory}
          />
        </div>
      ))}
    </div>
  );
};

export default SubCategories;
