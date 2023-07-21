import React from "react";
import { Button, Stack } from "@mui/material";
import Auth from "../../utils/auth";
import "./Account.css";

const Account = ({ setView }) => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const handleNavigation = (newView) => {
    setView(newView);
  };

  return (
    <div className="container">
      <h2>Hello, {Auth.loggedIn() && Auth.getProfile().data.username}</h2>
      {Auth.loggedIn() ? (
        <>
          <div className="top-btns">
            <Button
              variant="contained"
              onClick={() => handleNavigation("orders")}
            >
              View Orders
            </Button>
            <Button
              variant="contained"
              onClick={() => handleNavigation("cart")}
            >
              View Cart
            </Button>
          </div>
          <div className="bottom-btns">
            <Button
              variant="contained"
              onClick={() => handleNavigation("mainCategories")}
            >
              Shop
            </Button>
            <Button variant="contained" onClick={logout}>
              Logout
            </Button>
          </div>
        </>
      ) : (
        <Stack spacing={2}>
          <Button variant="contained" onClick={() => handleNavigation("login")}>
            Login
          </Button>
          <Button
            variant="contained"
            onClick={() => handleNavigation("signup")}
          >
            Signup
          </Button>
        </Stack>
      )}
    </div>
  );
};

export default Account;
