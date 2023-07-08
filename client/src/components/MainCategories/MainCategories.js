import React from "react";
import "./MainCategories.css"; // Import the CSS file for styling

import Poles from "../../images/poles2.jpg";
import Reels from "../../images/reels2.jpg";
import Tackle from "../../images/tackle.jpg";
import Lures from "../../images/lures.jpg";
import Accessories from "../../images/tools.jpg";
import Line from "../../images/clothing.jpg";

import vidClips from "../../videos/VidClips.mp4";

import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import { Typography } from "@mui/material";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const MainCategories = ({ onCategoryClick }) => {
  return (
    <ThemeProvider theme={theme}>
      <div className="main-categories">
        <div
          className="main-category sales"
          onClick={() => onCategoryClick("Sales")}
        >
          <video src={vidClips} autoPlay loop muted />
        </div>
        <div
          className="main-category rods"
          onClick={() => onCategoryClick("Rods")}
        >
          <img className="category-image" src={Poles} alt="fishing poles" />
          <div className="category-overlay">
            <Typography className="category-title " variant="h4">
              Rods
            </Typography>
          </div>
        </div>
        <div
          className="main-category reels"
          onClick={() => onCategoryClick("Reels")}
        >
          <img className="category-image" src={Reels} alt="fishing reel" />
          <div className="category-overlay">
            <Typography className="category-title" variant="h4">
              Reels
            </Typography>
          </div>
        </div>
        <div
          className="main-category lures"
          onClick={() => onCategoryClick("Lures")}
        >
          <img className="category-image" src={Lures} alt="fishing lures" />
          <div className="category-overlay">
            <Typography className="category-title" variant="h4">
              Lures
            </Typography>
          </div>
        </div>
        <div
          className="main-category tackle"
          onClick={() => onCategoryClick("Tackle")}
        >
          <img className="category-image" src={Tackle} alt="fishing tackle" />
          <div className="category-overlay">
            <Typography className="category-title" variant="h4">
              Tackle
            </Typography>
          </div>
        </div>
        <div
          className="main-category line"
          onClick={() => onCategoryClick("Line")}
        >
          <img className="category-image" src={Line} alt="fishing line" />
          <div className="category-overlay">
            <Typography className="category-title" variant="h4">
              Line
            </Typography>
          </div>
        </div>
        <div
          className="main-category accessories"
          onClick={() => onCategoryClick("Accessories")}
        >
          <img
            className="category-image"
            src={Accessories}
            alt="multi-tool pliars"
          />
          <div className="category-overlay">
            <Typography className="category-title" variant="h4">
              Accessories
            </Typography>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default MainCategories;
