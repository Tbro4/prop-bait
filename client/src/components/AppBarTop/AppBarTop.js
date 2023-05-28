import * as React from "react";
import { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useLazyQuery } from "@apollo/client";
import { QUERY_PRODUCTS_BY_KEYWORD } from "../../utils/queries";

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
    marginLeft: theme.spacing(3),
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
  maxHeight: "200px",
  overflowY: "auto",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  borderRadius: theme.shape.borderRadius,
  zIndex: 1,
}));

const SearchOptionItem = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  cursor: "pointer",
  color: theme.palette.text.primary,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function AppBarTop({ onResetView }) {
  const [searchOptions, setSearchOptions] = useState([]);
  const [getSearchOptions, { data }] = useLazyQuery(QUERY_PRODUCTS_BY_KEYWORD);

  const handleSearchInputChange = (event) => {
    const keyword = event.target.value;
    if (keyword.trim() !== "") {
      getSearchOptions({ variables: { keyword } });
    } else {
      setSearchOptions([]);
    }
  };

  useEffect(() => {
    if (data && data.productsByKeyword) {
      setSearchOptions(data.productsByKeyword);
    }
  }, [data]);

  const handleLogoClick = () => {
    onResetView();
  };

  const handleOptionClick = (option) => {
    console.log(option);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            onClick={handleLogoClick}
            sx={{
              display: { xs: "block", sm: "block" },
              textDecoration: "none",
              boxShadow: "none",
              color: "white",
            }}
          >
            &#123;prop&#125; bait
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearchInputChange}
            />
            {searchOptions.length > 0 && (
              <SearchOptions>
                {searchOptions.map((option) => (
                  <SearchOptionItem
                    key={option._id}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option.name}
                  </SearchOptionItem>
                ))}
              </SearchOptions>
            )}
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
