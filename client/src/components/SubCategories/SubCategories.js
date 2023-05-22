import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_SUBCATEGORIES_BY_CATEGORY } from "../../utils/queries";
import "./SubCategories.css";

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
  console.log(subCategories);

  const handleSubCategoryClick = (subCategory) => {
    onSubCategoryClick(subCategory);
  };

  return (
    <>
      <h1>{subCategories[0].category}</h1>
      <div className="sub-categories">
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
    </>
  );
};

export default SubCategories;
