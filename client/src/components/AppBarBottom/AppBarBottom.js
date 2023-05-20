import * as React from "react";
import Box from "@mui/material/Box";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";

export default function FixedBottomNavigation() {
  const [value, setValue] = React.useState();
  const ref = React.useRef(null);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels={false}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            component={Link}
            to={"/"}
            category={"Fishing Rods"}
            label="Shop"
            icon={<MenuIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/Account"
            label="Account"
            icon={<AccountCircle />}
          />
          <BottomNavigationAction
            component={Link}
            to="/Cart"
            label="Cart"
            icon={<ShoppingCartIcon />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
