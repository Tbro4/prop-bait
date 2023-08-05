import React, { useState } from "react";
import { Button, Stack } from "@mui/material";
import AuthService from "../../utils/auth";
import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
import { DELETE_ACCOUNT } from "../../utils/mutations";
import "./Account.css";

const Account = ({ setView }) => {
  const profile = AuthService.getProfile();
  const userId = profile ? profile.data._id : null;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteAccount] = useMutation(DELETE_ACCOUNT, {
    variables: { userId },
    onCompleted: () => {
      // Handle any post-deletion logic, e.g., redirecting to the login page
    },
    onError: (error) => {
      console.log("error removing account");
    },
  });

  const handleDeleteAccount = () => {
    // Show the confirmation dialog
    setShowConfirmation(true);
  };

  const handleConfirmation = (confirmed) => {
    // Hide the confirmation dialog
    setShowConfirmation(false);

    if (confirmed) {
      // If confirmed, call the deleteAccount mutation
      Auth.logout();
      deleteAccount();
    }
  };
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
            <div className="option-btns">
              <Button variant="contained" onClick={handleDeleteAccount}>
                Delete Account
              </Button>
            </div>
          </div>
          {showConfirmation && (
            <div>
              Are you sure you want to delete your account?
              <button onClick={() => handleConfirmation(true)}>Yes</button>
              <button onClick={() => handleConfirmation(false)}>No</button>
            </div>
          )}
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
