import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useTheme } from "@mui/material/styles";

export default function FixedBottomNavigation({ view, setView }) {
  const theme = useTheme();
  const handleNavigation = (newView) => {
    setView(newView);
  };

  return (
    <Box sx={{ pb: 7 }}>
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
          value={view}
          style={{ backgroundColor: theme.palette.secondary.main }}
        >
          <BottomNavigationAction
            label="Shop"
            icon={<MenuIcon />}
            onClick={() => handleNavigation("mainCategories")}
          />
          <BottomNavigationAction
            label="Account"
            icon={<AccountCircle />}
            onClick={() => handleNavigation("account")}
          />
          <BottomNavigationAction
            label="Cart"
            icon={<ShoppingCartIcon />}
            onClick={() => handleNavigation("cart")}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
