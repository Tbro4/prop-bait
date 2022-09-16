import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Account from "./pages/Account";
import Signup from "./pages/Signup";
import AppBarTop from "./components/AppBarTop/AppBarTop";
import AppBarBottom from "./components/AppBarBottom/AppBarBottom";

import Cart from "./pages/Cart";
import { Container } from "@mui/system";

function App() {
  return (
    <Router>
      <Container maxWidth="xs">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Shop" element={<Shop />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/Cart" element={<Cart />} />
        </Routes>
        <AppBarTop />
        <AppBarBottom />
      </Container>
    </Router>
  );
}

export default App;
