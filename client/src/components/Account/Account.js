import React from "react";
import { Button, Container, Stack } from "@mui/material";
import Auth from "../../utils/auth";

const Account = ({ onResetView }) => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const handleLoginClick = () => {
    onResetView();
  };

  const handleSignupClick = () => {
    onResetView();
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
            <Button variant="contained" onClick={handleLoginClick}>
              Login
            </Button>
            <Button variant="contained" onClick={handleSignupClick}>
              Signup
            </Button>
          </Stack>
        </Container>
      )}
    </>
  );
};

export default Account;

// //render either their account page or Login/Signup page if they arent logged in
// import React from "react";
// import { Button, Container, Stack } from "@mui/material";
// import { Link } from "react-router-dom";
// import Auth from "../../utils/auth";

// const Account = () => {
//   const logout = (event) => {
//     event.preventDefault();
//     Auth.logout();
//   };
//   return (
//     <>
//       <br></br>
//       <br></br>
//       <br></br>
//       <br></br>
//       {Auth.loggedIn() ? (
//         <>
//           <p>USUHH {Auth.getProfile().data.username}</p>
//           <Button variant="contained" onClick={logout}>
//             Logout
//           </Button>
//         </>
//       ) : (
//         <Container>
//           <Stack spacing={2}>
//             <Button variant="contained" component={Link} to="/Login">
//               Login
//             </Button>
//             <Button variant="contained" component={Link} to="/Signup">
//               Signup
//             </Button>
//           </Stack>
//         </Container>
//       )}
//     </>
//   );
// };

// export default Account;
