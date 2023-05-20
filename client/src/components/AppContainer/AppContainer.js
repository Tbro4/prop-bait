import React, { useState } from "react";
import Home from "../../pages/Home";

const AppContainer = () => {
  const [view, setView] = useState("mainCategories");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [previousViews, setPreviousViews] = useState([]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategory(null);
    setSelectedProduct(null);
    setPreviousViews((prevViews) => [...prevViews, view]);
    setView("subCategories");
  };

  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setSelectedProduct(null);
    setPreviousViews((prevViews) => [...prevViews, view]);
    setView("products");
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setPreviousViews((prevViews) => [...prevViews, view]);
    setView("product");
  };

  const handleGoBack = () => {
    if (previousViews.length > 0) {
      const prevView = previousViews.pop();
      setPreviousViews([...previousViews]);
      setView(prevView);
    }
  };

  const handleResetView = () => {
    setView("mainCategories");
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setSelectedProduct(null);
    setPreviousViews([]);
  };

  return (
    <div>
      <Home
        view={view}
        selectedCategory={selectedCategory}
        selectedSubCategory={selectedSubCategory}
        selectedProduct={selectedProduct}
        onCategoryClick={handleCategoryClick}
        onSubCategoryClick={handleSubCategoryClick}
        onProductClick={handleProductClick}
        onGoBack={handleGoBack}
        onResetView={handleResetView}
      />
    </div>
  );
};

export default AppContainer;

// import React, { useState } from "react";
// import Home from "../../pages/Home";

// const AppContainer = () => {
//   const [view, setView] = useState("mainCategories");
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedSubCategory, setSelectedSubCategory] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [previousView, setPreviousView] = useState(null);

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//     setSelectedSubCategory(null);
//     setSelectedProduct(null);
//     setPreviousView(view);
//     setView("subCategories");
//   };

//   const handleSubCategoryClick = (subCategory) => {
//     setSelectedSubCategory(subCategory);
//     setSelectedProduct(null);
//     setPreviousView(view);
//     setView("products");
//   };

//   const handleProductClick = (product) => {
//     setSelectedProduct(product);
//     setPreviousView(view);
//     setView("product");
//   };

//   const handleGoBack = (prevView) => {
//     setPreviousView(null);

//     if (prevView === "mainCategories") {
//       setView("mainCategories");
//     } else if (prevView === "subCategories") {
//       setSelectedSubCategory(null);
//       setView("subCategories");
//     } else if (prevView === "products") {
//       setSelectedProduct(null);
//       setView("products");
//     } else if (prevView === "product") {
//       setSelectedProduct(null);
//       setView("product");
//     }
//   };

//   const handleResetView = () => {
//     setView("mainCategories");
//     setSelectedCategory(null);
//     setSelectedSubCategory(null);
//     setSelectedProduct(null);
//     setPreviousView(null);
//   };

//   return (
//     <div>
//       <Home
//         view={view}
//         selectedCategory={selectedCategory}
//         selectedSubCategory={selectedSubCategory}
//         selectedProduct={selectedProduct}
//         previousView={previousView}
//         onCategoryClick={handleCategoryClick}
//         onSubCategoryClick={handleSubCategoryClick}
//         onProductClick={handleProductClick}
//         onGoBack={handleGoBack}
//         onResetView={handleResetView}
//       />
//     </div>
//   );
// };

// export default AppContainer;

// // import React, { useState } from "react";
// // import Home from "../../pages/Home";

// // const AppContainer = () => {
// //   const [view, setView] = useState("mainCategories");
// //   const [selectedCategory, setSelectedCategory] = useState(null);
// //   const [selectedSubCategory, setSelectedSubCategory] = useState(null);
// //   const [selectedProduct, setSelectedProduct] = useState(null);
// //   const [previousView, setPreviousView] = useState(null);

// //   const handleCategoryClick = (category) => {
// //     setSelectedCategory(category);
// //     setSelectedSubCategory(null);
// //     setSelectedProduct(null);
// //     setPreviousView(view);
// //     setView("subCategories");
// //   };

// //   const handleSubCategoryClick = (subCategory) => {
// //     setSelectedSubCategory(subCategory);
// //     setSelectedProduct(null);
// //     setPreviousView(view);
// //     setView("products");
// //   };

// //   const handleProductClick = (product) => {
// //     setSelectedProduct(product);
// //     setPreviousView(view);
// //     setView("product");
// //   };

// //   const handleGoBack = () => {
// //     if (previousView === "mainCategories") {
// //       setPreviousView(null);
// //       setView("mainCategories");
// //     } else if (previousView === "subCategories") {
// //       setSelectedSubCategory(null);
// //       setView(previousView);
// //     } else if (previousView === "products") {
// //       setSelectedProduct(null);
// //       setView(previousView);
// //     } else if (previousView === "product") {
// //       setSelectedProduct(null);
// //       setView(previousView);
// //     }
// //   };

// //   const handleResetView = () => {
// //     setView("mainCategories");
// //     setSelectedCategory(null);
// //     setSelectedSubCategory(null);
// //     setSelectedProduct(null);
// //     setPreviousView(null);
// //   };

// //   return (
// //     <div>
// //       <Home
// //         view={view}
// //         selectedCategory={selectedCategory}
// //         selectedSubCategory={selectedSubCategory}
// //         selectedProduct={selectedProduct}
// //         previousView={previousView}
// //         onCategoryClick={handleCategoryClick}
// //         onSubCategoryClick={handleSubCategoryClick}
// //         onProductClick={handleProductClick}
// //         onGoBack={handleGoBack}
// //         onResetView={handleResetView}
// //       />
// //     </div>
// //   );
// // };

// // export default AppContainer;

// // // import React, { useState } from "react";
// // // import Home from "../../pages/Home";

// // // const AppContainer = () => {
// // //   const [view, setView] = useState("mainCategories");
// // //   const [selectedCategory, setSelectedCategory] = useState(null);
// // //   const [selectedSubCategory, setSelectedSubCategory] = useState(null);
// // //   const [selectedProduct, setSelectedProduct] = useState(null);

// // //   const handleCategoryClick = (category) => {
// // //     setSelectedCategory(category);
// // //     setSelectedSubCategory(null);
// // //     setSelectedProduct(null);
// // //     setView("subCategories");
// // //   };

// // //   const handleSubCategoryClick = (subCategory) => {
// // //     setSelectedSubCategory(subCategory);
// // //     setSelectedProduct(null);
// // //     setView("products");
// // //   };

// // //   const handleProductClick = (product) => {
// // //     setSelectedProduct(product);
// // //     setView("product");
// // //   };

// // //   const handleResetView = () => {
// // //     setView("mainCategories");
// // //     setSelectedCategory(null);
// // //     setSelectedSubCategory(null);
// // //     setSelectedProduct(null);
// // //   };

// // //   return (
// // //     <div>
// // //       <Home
// // //         view={view}
// // //         selectedCategory={selectedCategory}
// // //         selectedSubCategory={selectedSubCategory}
// // //         selectedProduct={selectedProduct}
// // //         onCategoryClick={handleCategoryClick}
// // //         onSubCategoryClick={handleSubCategoryClick}
// // //         onProductClick={handleProductClick}
// // //         onResetView={handleResetView}
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default AppContainer;
