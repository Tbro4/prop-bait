import React from "react";
import { Button, Container, Stack } from "@mui/material";
import Auth from "../../utils/auth";

const Account = ({ setView }) => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const handleNavigation = (newView) => {
    setView(newView);
  };

  return (
    <>
      <br />

      {Auth.loggedIn() ? (
        <>
          <h2>Hello, {Auth.getProfile().data.username}</h2>
          <Button variant="contained" onClick={logout}>
            Logout
          </Button>
          <Button variant="contained" onClick={() => handleNavigation("list")}>
            View List
          </Button>
          <Button variant="contained" onClick={() => handleNavigation("cart")}>
            View Cart
          </Button>
          <Button
            variant="contained"
            onClick={() => handleNavigation("mainCategories")}
          >
            Shop
          </Button>
        </>
      ) : (
        <Container>
          <Stack spacing={2}>
            <Button
              variant="contained"
              onClick={() => handleNavigation("login")}
            >
              Login
            </Button>
            <Button
              variant="contained"
              onClick={() => handleNavigation("signup")}
            >
              Signup
            </Button>
          </Stack>
        </Container>
      )}
    </>
  );
};

export default Account;
