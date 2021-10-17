import Home from "./pages/Home";
import "./App.css";
import { ArrowUpwardRounded } from "@mui/icons-material";
import styled from "styled-components";
import { useState } from "react";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import About from "./pages/About";
import Register from "./pages/Register";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Success from "./pages/Success";
import { useSelector } from "react-redux";
import Settings from "./pages/settings/Settings";
import Singleorder from "./pages/SingleOrder";
import ScrollToTop from "react-router-scroll-top";
import Features from "./pages/Features";

const Button = styled.div`
  position: fixed;
  width: 100%;
  left: 80%;
  bottom: 40px;
  height: 20px;
  font-size: 3rem;
  z-index: 333;
  cursor: pointer;
  color: white;
`;

const App = () => {
  const [visible, setVisible] = useState(false);
  const user = useSelector((state) => state.user?.currentUser);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <>
      <Router>
        <ScrollToTop>
          <Switch>
            <Route exact path="/">
              <Home
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
              />
            </Route>
            <Route path="/products/:category">
              <Shop
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </Route>
            <Route exact path="/products">
              <Shop
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
              />
            </Route>
            <Route path="/cart">
              <Cart
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
              />
            </Route>
            <Route path="/login">
              {user ? (
                <Redirect to="/" />
              ) : (
                <Login
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  menuOpen={menuOpen}
                  setMenuOpen={setMenuOpen}
                />
              )}
            </Route>
            <Route path="/register">
              {user ? (
                <Redirect to="/" />
              ) : (
                <Register
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  menuOpen={menuOpen}
                  setMenuOpen={setMenuOpen}
                />
              )}
            </Route>
            <Route path="/contact">
              <Contact
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
              />
            </Route>
            <Route path="/success">
              <Success />
            </Route>
            <Route path="/features">
              <Features
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
              />
            </Route>
            <Route path="/about">
              <About
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
              />
            </Route>
            <Route path="/singleOrder/:orderId">
              <Singleorder />
            </Route>
            <Route path="/settings">
              {user ? (
                <Settings
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  menuOpen={menuOpen}
                  setMenuOpen={setMenuOpen}
                />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
          </Switch>
        </ScrollToTop>
      </Router>
      <Button>
        <ArrowUpwardRounded
          onClick={scrollToTop}
          style={{
            display: visible ? "inline" : "none",
            backgroundColor: "#717fe0",
            borderRadius: "50%",
            padding: "10px",
          }}
        />
      </Button>
    </>
  );
};

export default App;
