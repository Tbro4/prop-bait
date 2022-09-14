import React from "react";
import AppBarTop from "../components/AppBarTop/AppBarTop";
import AppBarBottom from "../components/AppBarBottom/AppBarBottom";
import ShopHome from "../components/ShopHome/ShopHome";

const Shop = () => {
  return (
    <div className="App">
      <AppBarTop />
      <ShopHome />
      <AppBarBottom />
    </div>
  );
};

export default Shop;
