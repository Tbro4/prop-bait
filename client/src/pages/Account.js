//render either their account page or Login/Signup page if they arent logged in
import React from "react";
import { Button, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const Account = () => {
  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Container>
        <Stack spacing={2}>
          <Button variant="contained" component={Link} to="/Login">
            Login
          </Button>
          <Button variant="contained" component={Link} to="/Signup">
            Signup
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export default Account;
