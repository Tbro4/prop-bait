import React from "react";
import Box from "@mui/material/Box";
import TopPic from "../images/homepage.jpg";
import Poles from "../images/poles2.jpg";
import Reels from "../images/reels2.jpg";
import Tackle from "../images/tackle.jpg";
import Lures from "../images/lures.jpg";
import Tools from "../images/tools.jpg";
import Clothing from "../images/clothing.jpg";

const Home = () => {
  return (
    <div style={{ width: "100%" }}>
      <Box
        sx={{
          display: "grid",
          gridAutoFlow: "row",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(8, 1fr)",
          gap: 1.5,
        }}
      >
        <Box
          component="img"
          sx={{
            height: "100%",
            maxWidth: "100%",
            gridColumn: "1 / 3",
            gridRow: "1 / 3",
          }}
          alt="man fishing"
          src={TopPic}
        />

        <Box
          component="img"
          sx={{
            height: "100%",
            maxWidth: "100%",
            gridColumn: "1 / 2",
            gridRow: "3 / 5",
          }}
          alt="man fishing"
          src={Poles}
        />
        <Box
          component="img"
          sx={{
            height: "100%",
            maxWidth: "100%",
            gridColumn: "2",
            gridRow: "3",
          }}
          alt="man fishing"
          src={Reels}
        />
        <Box
          component="img"
          sx={{
            height: "100%",
            maxWidth: "100%",
            gridColumn: "2",
            gridRow: "4",
          }}
          alt="man fishing"
          src={Lures}
        />
        <Box
          component="img"
          sx={{
            height: "100%",
            maxWidth: "100%",
            gridColumn: "1",
            gridRow: "5",
          }}
          alt="man fishing"
          src={Tackle}
        />
        <Box
          component="img"
          sx={{
            height: "100%",
            maxWidth: "100%",
            gridColumn: "1",
            gridRow: "6",
          }}
          alt="man fishing"
          src={Clothing}
        />

        <Box
          component="img"
          sx={{
            height: "100%",
            maxWidth: "100%",
            gridColumn: "2",
            gridRow: "5/7",
          }}
          alt="man fishing"
          src={Tools}
        />
      </Box>
    </div>
  );
};

export default Home;
