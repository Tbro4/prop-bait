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
      {Auth.loggedIn() ? (
        <>
          <h2>Hello, {Auth.loggedIn() && Auth.getProfile().data.username}</h2>
          <div className="option-btns">
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
          <div className="option-btns">
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
          <Button
            className="loginSignupBtn"
            variant="contained"
            onClick={() => handleNavigation("login")}
          >
            Login
          </Button>
          <Button
            className="loginSignupBtn"
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
