import React from "react";

import { useQuery } from "@apollo/client";

import ShopHome from "../components/ShopHome/ShopHome";

import { QUERY_PRODUCTS } from "../utils/queries";

const Shop = () => {
  const { loading, error, data } = useQuery(QUERY_PRODUCTS);
  console.log(loading);
  const products = data?.products || [];

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
