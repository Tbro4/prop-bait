import React from "react";
import "./MainCategories.css"; // Import the CSS file for styling

import TopPic from "../../images/homepage.jpg";
import Poles from "../../images/poles2.jpg";
import Reels from "../../images/reels2.jpg";
import Tackle from "../../images/tackle.jpg";
import Lures from "../../images/lures.jpg";
import Accessories from "../../images/tools.jpg";
import Line from "../../images/clothing.jpg";
import { Typography } from "@mui/material";

const MainCategories = ({ onCategoryClick }) => {
  return (
    <div className="main-categories">
      <div
        className="main-category"
        onClick={() => onCategoryClick("Shop Sales")}
      >
        <img className="category-image" src={TopPic} alt="man fishing" />
        <div className="category-overlay">
          <Typography variant="h5" className="category-title">
            Shop Sales
          </Typography>
        </div>
      </div>
      <div
        className="main-category"
        onClick={() => onCategoryClick("Fishing Rods")}
      >
        <img className="category-image" src={Poles} alt="fishing poles" />
        <div className="category-overlay">
          <Typography variant="h5" className="category-title">
            Rods
          </Typography>
        </div>
      </div>
      <div
        className="main-category"
        onClick={() => onCategoryClick("Fishing Reels")}
      >
        <img className="category-image" src={Reels} alt="fishing reel" />
        <div className="category-overlay">
          <Typography variant="h5" className="category-title">
            Reels
          </Typography>
        </div>
      </div>
      <div
        className="main-category"
        onClick={() => onCategoryClick("Fishing Lures")}
      >
        <img className="category-image" src={Lures} alt="fishing lures" />
        <div className="category-overlay">
          <Typography variant="h5" className="category-title">
            Lures
          </Typography>
        </div>
      </div>
      <div
        className="main-category"
        onClick={() => onCategoryClick("Fishing Tackle")}
      >
        <img className="category-image" src={Tackle} alt="fishing tackle" />
        <div className="category-overlay">
          <Typography variant="h5" className="category-title">
            Tackle
          </Typography>
        </div>
      </div>
      <div
        className="main-category"
        onClick={() => onCategoryClick("Fishing Line")}
      >
        <img className="category-image" src={Line} alt="fishing line" />
        <div className="category-overlay">
          <Typography variant="h5" className="category-title">
            Line
          </Typography>
        </div>
      </div>
      <div
        className="main-category"
        onClick={() => onCategoryClick("Fishing Accessories")}
      >
        <img
          className="category-image"
          src={Accessories}
          alt="multi-tool pliars"
        />
        <div className="category-overlay">
          <Typography variant="h5" className="category-title">
            Accessories
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default MainCategories;
