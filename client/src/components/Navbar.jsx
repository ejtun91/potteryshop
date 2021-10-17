import {
  Close,
  FavoriteBorderOutlined,
  ManageSearch,
  Menu,
  Search,
  ShoppingCart,
} from "@mui/icons-material";
import { Badge } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import "../App.css";
import CheckoutSlide from "./CheckoutSlide";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { mobile } from "../responsive";
import "./styles.scss";
import { useMediaQuery } from "@material-ui/core";
import { useRef } from "react";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  justify-content: space-around;
  top: 0;
  position: sticky;
  z-index: 2;
  background-color: #d7dbdc;
  transition: all 0.4s ease;
  padding-top: 1em;

  ${mobile({ position: "static" })}
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 30%;

  ${mobile({
    width: "100%",
    height: "max-content",
    overflow: "hidden",
  })}
`;
const LogoText = styled.h2`
  cursor: pointer;
  ${mobile({ position: "absolute", top: "1em", left: ".5em", zIndex: "6" })}
`;
const NavbarList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;

  ${mobile({
    flexDirection: "column",
    marginTop: "8em",
    width: "100%",
    padding: "10px 5px",
    alignItems: "flex-start",
    marginLeft: "1em",
    gap: "1em",
    transition: "all .5s ease-in-out",
    transformOrigin: "left top",
    transform: "scaleY(0)",
  })}
`;
const NavbarItem = styled.li`
  margin-right: 10px;
  color: #555555;
  cursor: pointer;
  font-size: 14px;
  padding-bottom: 1px;

  &:hover {
    color: #717fe0;
    border-bottom: 1px solid #717fe0;

    ${mobile({ color: "black", paddingBottom: 0, zIndex: "5" })}
  }
  ${mobile({ color: "white" })}
`;
const CartAndSearch = styled.div`
  display: flex;
  width: 500px;
  justify-content: flex-end;

  ${mobile({
    position: "absolute",
    top: "1.7em",
    right: ".1em",
  })}
`;
const IconDiv = styled.div`
  margin-right: 1em;
  cursor: pointer;
`;

const HamburgerIcon = styled.div`
  width: 23px;
  height: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 3px;
  cursor: pointer;
`;
const Line = styled.span`
  width: 100%;
  height: 3px;
  background-color: black;
  transform-origin: left;
  transition: all 1s ease;
`;

const InputContainer = styled.div``;

const Input = styled.input`
  margin-right: 1em;
  background-color: #797979;
  border: none;
  border-radius: 10px;
  margin-bottom: 5px;
  color: white;
  padding: 0px 10px;
  width: 150px;

  ::placeholder {
    color: #bbbbbb;
  }

  &:focus {
    outline: none;
  }

  ${mobile({
    width: "80px",
  })}
`;

const Navbar = ({
  whiteColor,
  border,
  padding,
  menuOpen,
  setMenuOpen,
  searchTerm,
  setSearchTerm,
}) => {
  const [openCheckout, setOpenCheckout] = useState(false);
  const [colorChange, setColorchange] = useState(false);
  const quantity = useSelector((state) => state.cart.quantity);
  // const smallScreen = window.screen.width <= 480 ? true : false;
  const mediaQuery = useMediaQuery("(max-width:768px)");
  const [search, setSearch] = useState(false);
  const inputRef = useRef();
  const manageRef = useRef();
  const history = useHistory();

  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      history.push(`/products/` + searchTerm.toLowerCase());
    }
  };

  return (
    <>
      <Container
        style={{
          backgroundColor: whiteColor,
          borderBottom: !mediaQuery && border,
          padding: !mediaQuery && padding,
        }}
        className={colorChange ? "navbar colorChange" : "navbar"}
      >
        <Logo>
          <Link className="link" to="/">
            <LogoText>
              <b>G.</b> <span style={{ fontWeight: "200" }}>PEKE</span>
            </LogoText>
          </Link>
          <ul className={"navbarTop " + (menuOpen && "active")}>
            <Link onClick={() => setMenuOpen(false)} to="/" className="link">
              <NavbarItem>Home</NavbarItem>
            </Link>
            <Link
              onClick={() => setMenuOpen(false)}
              to="/products"
              className="link"
            >
              <NavbarItem>Shop</NavbarItem>
            </Link>
            <Link
              onClick={() => setMenuOpen(false)}
              to="/features"
              className="link"
            >
              <NavbarItem>Best Seller</NavbarItem>
            </Link>
            <Link
              onClick={() => setMenuOpen(false)}
              to="/about"
              className="link"
            >
              <NavbarItem>About</NavbarItem>
            </Link>
            <Link
              onClick={() => setMenuOpen(false)}
              to="/contact"
              className="link"
            >
              <NavbarItem>Contact</NavbarItem>
            </Link>
          </ul>
        </Logo>

        <CartAndSearch>
          {search && (
            <Input
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search Product..."
              ref={inputRef}
            />
          )}
          <IconDiv onClick={() => setSearch(!search)}>
            <Search style={{ color: "#333" }} />
          </IconDiv>
          <IconDiv onClick={() => setOpenCheckout(!openCheckout)}>
            <Badge badgeContent={quantity} color="secondary">
              <ShoppingCart style={{ color: "#333" }} />
            </Badge>
          </IconDiv>
          <IconDiv>
            <FavoriteBorderOutlined style={{ color: "#333" }} />
          </IconDiv>
          <IconDiv>
            {mediaQuery && (
              <HamburgerIcon
                onClick={() => setMenuOpen(!menuOpen)}
                className={"hamburger " + (menuOpen && "active")}
              >
                <Line className="span"></Line>
                <Line className="span"></Line>
                <Line className="span"></Line>
              </HamburgerIcon>
            )}
          </IconDiv>
        </CartAndSearch>
      </Container>
      <CheckoutSlide
        openCheckout={openCheckout}
        setOpenCheckout={setOpenCheckout}
      />
    </>
  );
};

export default Navbar;
