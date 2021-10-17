import styled from "styled-components";
import Announcement from "../components/Announcement";
import CartProducts from "../components/CartProducts";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 50vh;

  ${mobile({ height: "100%" })}
`;

const Cart = ({ menuOpen, setMenuOpen, searchTerm, setSearchTerm }) => {
  const whiteColor = "#fff";
  const border = "1px solid #d7dbdc";
  const padding = "0.2em 0 0.2em 0";

  return (
    <Container>
      <Announcement setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
      <Navbar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        whiteColor={whiteColor}
        border={border}
        padding={padding}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <CartProducts />
      <Footer />
    </Container>
  );
};

export default Cart;
