import React from "react";
import { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useLazyQuery } from "@apollo/client";
import { QUERY_PRODUCTS_BY_KEYWORD } from "../../utils/queries";
import "./AppBarTop.css";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("xs")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const SearchOptions = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "calc(100% + 8px)",
  left: 0,
  width: "100%",
  maxHeight: "250px",
  overflowY: "auto",
  backgroundColor: theme.palette.background.paper,
  background: "#e0f7fa",
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  zIndex: 1,

  "& > *": {
    "&:not(:last-child)": {
      borderBottom: "1px solid " + theme.palette.divider,
    },
  },
}));

const Separator = styled("div")(({ theme }) => ({
  borderBottom: "1px solid " + theme.palette.divider,
  margin: theme.spacing(1, 0),
}));

const SearchOptionItem = styled("div")(
  ({ theme, isCategory, isSubcategory }) => ({
    padding: theme.spacing(1),
    cursor: "pointer",
    color: theme.palette.text.primary,
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    fontWeight: isCategory ? "bold" : "normal",
    fontStyle: isSubcategory ? "italic" : "normal",
  })
);

const Banner = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "20px",
  backgroundColor: theme.palette.secondary.main,
  textAlign: "center",
  color: theme.palette.primary.main,
  fontSize: "14px",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const BannerText = styled("p")(({ theme }) => ({
  margin: 0,
  padding: "4px 8px", // Adjust the padding to control the spacing between bannerTexts
}));

export default function AppBarTop({
  onResetView,
  onCategoryClick,
  onSubCategoryClick,
  onProductClick,
}) {
  const [searchOptions, setSearchOptions] = useState([]);
  const [getSearchOptions, { data }] = useLazyQuery(QUERY_PRODUCTS_BY_KEYWORD);
  const [showOptions, setShowOptions] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const bannerTexts = [
    "Free shipping on $150+",
    "Shimano and Daiwa products 25% off!",
  ];

  const handleSearchInputChange = (event) => {
    const keyword = event.target.value;
    setSearchInput(keyword);
    if (keyword.trim() !== "") {
      getSearchOptions({ variables: { keyword } });
      setShowOptions(true);
    } else {
      setSearchOptions([]);
      setShowOptions(false);
    }
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest("#search-options")) {
      setSearchInput("");
      setSearchOptions([]);
      setShowOptions(false);
    }
  };

  useEffect(() => {
    if (showOptions) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showOptions]);

  useEffect(() => {
    if (data && data.productsByKeyword) {
      setSearchOptions(data.productsByKeyword);
    }
  }, [data]);

  const handleLogoClick = () => {
    onResetView();
  };

  const handleOptionClick = (option) => {
    setSearchInput("");
    setSearchOptions([]);
    setShowOptions(false);

    if (option.category) {
      onCategoryClick(option.category);
    } else if (option.subCategory) {
      onSubCategoryClick(option.subCategory);
    } else {
      onProductClick(option);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            onClick={handleLogoClick}
            sx={{
              display: { xs: "flex", sm: "block" },
              textDecoration: "none",
              boxShadow: "none",
              color: "black",
              paddingRight: "20px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            {"{prop} bait"}&nbsp;<i className="fi fi-bs-fishing-rod"></i>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "var(--secondary-color)" }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(event) => handleSearchInputChange(event)}
              value={searchInput}
            />
            {showOptions && searchOptions.length > 0 && (
              <SearchOptions id="search-options">
                {React.Children.toArray(
                  // Display Categories
                  searchOptions
                    .reduce((acc, option) => {
                      const { category } = option;
                      if (!acc.includes(category)) {
                        acc.push(category);
                      }
                      return acc;
                    }, [])
                    .map((category, index, array) => {
                      const isLastCategory = index === array.length - 1;

                      return (
                        <>
                          <SearchOptionItem
                            key={`category-${index}`}
                            onClick={() => handleOptionClick({ category })}
                            isCategory
                          >
                            {category}
                          </SearchOptionItem>
                          {isLastCategory && <Separator />}
                        </>
                      );
                    })
                    // Display Subcategories
                    .concat(
                      searchOptions
                        .reduce((acc, option) => {
                          const { subCategory } = option;
                          if (!acc.includes(subCategory)) {
                            acc.push(subCategory);
                          }
                          return acc;
                        }, [])
                        .map((subCategory, index, array) => {
                          const isLastSubcategory = index === array.length - 1;

                          return (
                            <>
                              <SearchOptionItem
                                key={`subcategory-${index}`}
                                onClick={() =>
                                  handleOptionClick({ subCategory })
                                }
                                isSubcategory
                              >
                                {subCategory}
                              </SearchOptionItem>
                              {isLastSubcategory && <Separator />}
                            </>
                          );
                        })
                    )
                    // Display Individual Products
                    .concat(
                      searchOptions.map((option) => (
                        <SearchOptionItem
                          key={option._id}
                          onClick={() => handleOptionClick(option._id)}
                        >
                          {option.name}
                        </SearchOptionItem>
                      ))
                    )
                )}
              </SearchOptions>
            )}
          </Search>
        </Toolbar>
        <Banner>
          {bannerTexts.map((text, index) => (
            <BannerText key={index}>{text}</BannerText>
          ))}
        </Banner>
      </AppBar>
    </Box>
  );
}
