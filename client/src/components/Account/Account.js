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
      <br />
      <br />
      <br />
      {Auth.loggedIn() ? (
        <>
          <p>USUHH {Auth.getProfile().data.username}</p>
          <Button variant="contained" onClick={logout}>
            Logout
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
