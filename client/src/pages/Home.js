import React from "react";
import Box from "@mui/material/Box";
import TopPic from "../images/homepage.jpg";
import Poles from "../images/poles2.jpg";
import Reels from "../images/reels2.jpg";
import Tackle from "../images/tackle.jpg";
import Lures from "../images/lures.jpg";
import Accessories from "../images/tools.jpg";
import Line from "../images/clothing.jpg";
import { Typography } from "@mui/material";
import Image from "mui-image";
import { Link } from "react-router-dom";
import zIndex from "@mui/material/styles/zIndex";

function handleClick(event) {
  console.log(event.target);
  console.log(event.target.name);
}

const Home = () => {
  return (
    <div style={{ width: "100%", zIndex: 0 }}>
      <Box
        sx={{
          display: "grid",
          gridAutoFlow: "row",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(7, 1fr)",
          gap: 1.5,
          zIndex: 0,
        }}
      >
        <Box
          component={Link}
          to={"/Shop"}
          sx={{
            gridColumn: "1 / 3",
            gridRow: "1/3",
          }}
        >
          <Image
            fit="fill"
            duration={200}
            src={TopPic}
            alt="man fishing"
            onClick={handleClick}
          />
          <Box
            sx={{
              position: "relative",
              bottom: 0,
              left: 0,
              width: "100%",
              bgcolor: "rgba(0, 0, 0, 0.54)",
              color: "white",
            }}
          >
            <Typography
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                margin: "5px",
              }}
              variant="h5"
            >
              Shop Sales
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            // height: "100%",
            // maxWidth: "100%",
            gridColumn: "1 / 2",
            gridRow: "3 / 5",
          }}
        >
          <Image
            fit="fill"
            duration={200}
            src={Poles}
            alt="fishing poles"
            onClick={handleClick}
          />
          <Box
            sx={{
              position: "relative",
              bottom: 0,
              left: 0,
              width: "100%",
              bgcolor: "rgba(0, 0, 0, 0.54)",
              color: "white",
            }}
          >
            <Typography
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                margin: "5px",
              }}
              variant="h5"
            >
              Rods
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            // height: "100%",
            // maxWidth: "100%",
            gridColumn: "2",
            gridRow: "3",
          }}
        >
          <Image
            fit="fill"
            duration={200}
            src={Reels}
            alt="fishing reel"
            onClick={handleClick}
          />
          <Box
            sx={{
              position: "relative",
              bottom: 0,
              left: 0,
              width: "100%",
              bgcolor: "rgba(0, 0, 0, 0.54)",
              color: "white",
            }}
          >
            <Typography
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                margin: "5px",
              }}
              variant="h5"
            >
              Reels
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            // height: "100%",
            // maxWidth: "100%",
            gridColumn: "2",
            gridRow: "4",
          }}
        >
          <Image
            fit="fill"
            duration={200}
            src={Lures}
            alt="fishing lures"
            onClick={handleClick}
          />
          <Box
            sx={{
              position: "relative",
              bottom: 0,
              left: 0,
              width: "100%",
              bgcolor: "rgba(0, 0, 0, 0.54)",
              color: "white",
            }}
          >
            <Typography
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                margin: "5px",
              }}
              variant="h5"
            >
              Lures
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            //   height: "100%",
            //   maxWidth: "100%",
            gridColumn: "1",
            gridRow: "5",
          }}
        >
          <Image
            fit="fill"
            duration={200}
            src={Tackle}
            alt="fishing tackle"
            onClick={handleClick}
          />
          <Box
            sx={{
              position: "relative",
              bottom: 0,
              left: 0,
              width: "100%",
              bgcolor: "rgba(0, 0, 0, 0.54)",
              color: "white",
            }}
          >
            <Typography
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                margin: "5px",
              }}
              variant="h5"
            >
              Tackle
            </Typography>
          </Box>
        </Box>
        {/* <Box
          sx={{
            height: "100%",
            maxWidth: "100%",
            gridColumn: "1",
            gridRow: "6",
          }}
          component="img"
          src={Tackle}
          alt="tackle"
        /> */}
        <Box
          sx={{
            height: "100%",
            maxWidth: "100%",
            gridColumn: "1",
            gridRow: "6",
          }}
        >
          <Image
            fit="fill"
            duration={200}
            src={Line}
            alt="fishing line"
            onClick={handleClick}
          />
          <Box
            sx={{
              position: "relative",
              bottom: 0,
              left: 0,
              width: "100%",
              bgcolor: "rgba(0, 0, 0, 0.54)",
              color: "white",
            }}
          >
            <Typography
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                margin: "5px",
              }}
              variant="h5"
            >
              Line
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            // height: "100%",
            // maxWidth: "100%",
            gridColumn: "2",
            gridRow: "5/7",
          }}
        >
          <Image
            fit="fill"
            duration={200}
            src={Accessories}
            alt="multi-tool pliars"
            onClick={handleClick}
          />
          <Box
            sx={{
              position: "relative",
              bottom: 0,
              left: 0,
              width: "100%",
              bgcolor: "rgba(0, 0, 0, 0.54)",
              color: "white",
            }}
          >
            <Typography
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                margin: "5px",
              }}
              variant="h5"
            >
              Accessories
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
