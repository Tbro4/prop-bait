import React from "react";
import MainCategories from "../components/MainCategories/MainCategories";
import SubCategories from "../components/SubCategories/SubCategories";
import Products from "../components/Products/Products";
import Product from "../components/Product/Product";

const Home = ({
  view,
  selectedCategory,
  selectedSubCategory,
  selectedProduct,
  previousView,
  onCategoryClick,
  onSubCategoryClick,
  onProductClick,
  onResetView,
  onGoBack,
}) => {
  const handleGoBack = () => {
    onGoBack(previousView);
  };

  return (
    <div>
      {view === "mainCategories" && (
        <MainCategories onCategoryClick={onCategoryClick} />
      )}
      {view === "subCategories" && (
        <SubCategories
          category={selectedCategory}
          onSubCategoryClick={onSubCategoryClick}
        />
      )}
      {view === "products" && (
        <Products
          subCategory={selectedSubCategory}
          onProductClick={onProductClick}
        />
      )}
      {view === "product" && <Product productId={selectedProduct} />}
      {view !== "mainCategories" && (
        <>
          <button onClick={handleGoBack}>Go Back</button>
          <div style={{ paddingBottom: "20px", marginBottom: "40px" }}></div>
        </>
      )}
    </div>
  );
};

export default Home;

// import React from "react";
// import MainCategories from "../components/MainCategories/MainCategories";
// import SubCategories from "../components/SubCategories/SubCategories";
// import Products from "../components/Products/Products";
// import Product from "../components/Product/Product";

// const Home = ({
//   view,
//   selectedCategory,
//   selectedSubCategory,
//   selectedProduct,
//   previousView,
//   onCategoryClick,
//   onSubCategoryClick,
//   onProductClick,
//   onResetView,
// }) => {
//   return (
//     <div>
//       {view === "mainCategories" && (
//         <MainCategories onCategoryClick={onCategoryClick} />
//       )}
//       {view === "subCategories" && (
//         <SubCategories
//           category={selectedCategory}
//           onSubCategoryClick={onSubCategoryClick}
//         />
//       )}
//       {view === "products" && (
//         <Products
//           subCategory={selectedSubCategory}
//           onProductClick={onProductClick}
//         />
//       )}
//       {view === "product" && <Product productId={selectedProduct} />}
//       {view !== "mainCategories" && (
//         <>
//           <button onClick={onResetView}>Go Back</button>
//           <div style={{ paddingBottom: "20px", marginBottom: "40px" }}></div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Home;

// // import React, { useState } from "react";
// // import MainCategories from "../components/MainCategories/MainCategories";
// // import SubCategories from "../components/SubCategories/SubCategories";
// // import Products from "../components/Products/Products";
// // import Product from "../components/Product/Product";

// // const Home = (view, setView) => {
// //   // const [previousView, setPreviousView] = useState(null);

// //   // const [view, setView] = useState("mainCategories");
// //   // const [selectedCategory, setSelectedCategory] = useState(null);
// //   // const [selectedSubCategory, setSelectedSubCategory] = useState(null);
// //   // const [selectedProduct, setSelectedProduct] = useState(null);

// //   // const handleCategoryClick = (category) => {
// //   //   // setSelectedCategory(category);
// //   //   // setSelectedSubCategory(null);
// //   //   // setSelectedProduct(null);
// //   //   // setPreviousView(view);
// //   //   setView("subCategories");
// //   // };

// //   // const handleSubCategoryClick = (subCategory) => {
// //   //   // setSelectedSubCategory(subCategory);
// //   //   // setSelectedProduct(null);
// //   //   // setPreviousView(view);
// //   //   setView("products");
// //   // };

// //   // const handleProductClick = (product) => {
// //   //   // setSelectedProduct(product);
// //   //   // setPreviousView(view);
// //   //   setView("product");
// //   // };

// //   const handleGoBack = () => {
// //     if (view === "subCategories") {
// //       // setSelectedSubCategory(null);
// //       setView("mainCategories");
// //     } else if (view === "products") {
// //       // setSelectedProduct(null);
// //       setView("subCategories");
// //     } else if (view === "product") {
// //       // setSelectedProduct(null);
// //       setView("products");
// //     }
// //   };
// //   // const handleGoBack = () => {
// //   //   if (view === "mainCategories") {
// //   //     // No previous view to go back to
// //   //     return;
// //   //   } else if (view === "subCategories") {
// //   //     setSelectedSubCategory(null);
// //   //     setView(previousView);
// //   //   } else if (view === "products") {
// //   //     setSelectedProduct(null);
// //   //     setView(previousView);
// //   //   } else if (view === "product") {
// //   //     setSelectedProduct(null);
// //   //     setView(previousView);
// //   //   }
// //   // };

// //   return (
// //     <div>
// //       {view === "mainCategories" && (
// //         <MainCategories onCategoryClick={handleCategoryClick} />
// //       )}
// //       {view === "subCategories" && (
// //         <SubCategories
// //           category={selectedCategory}
// //           onSubCategoryClick={handleSubCategoryClick}
// //         />
// //       )}
// //       {view === "products" && (
// //         <Products
// //           subCategory={selectedSubCategory}
// //           onProductClick={handleProductClick}
// //         />
// //       )}
// //       {view === "product" && <Product productId={selectedProduct} />}
// //       {view !== "mainCategories" && (
// //         <>
// //           <button onClick={handleGoBack}>Go Back</button>
// //           <div style={{ paddingBottom: "20px", marginBottom: "40px" }}></div>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default Home;
