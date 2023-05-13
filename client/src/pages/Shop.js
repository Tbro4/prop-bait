import React from "react";

import { useQuery } from "@apollo/client";

import ShopHome from "../components/ShopHome/ShopHome";

import {
  QUERY_ALL_PRODUCTS,
  QUERY_PRODUCTS,
  QUERY_PRODUCTS_BY_SUBCATEGORY,
} from "../utils/queries";

const Shop = () => {
  const subCategory = "Fish Cleaning & Processing";
  const { loading, error, data } = useQuery(QUERY_PRODUCTS_BY_SUBCATEGORY, {
    variables: { subCategory },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const products = data?.productsBySubCategory || [];
  console.log(products);

  return (
    <>
      <div className="App">
        <>
          <h1>SHOP</h1>
        </>
        <div className="col-12 col-md-8 mb-3">
          {loading ? <div>Loading...</div> : <ShopHome products={products} />}
        </div>
      </div>
    </>
  );
};

export default Shop;
