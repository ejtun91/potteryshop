import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ShopProducts from "../components/ShopProducts";
import "../App.css";

const Container = styled.div``;

const Shop = ({ menuOpen, setMenuOpen, searchTerm }) => {
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
      />
      <ShopProducts searchTerm={searchTerm} />
      <Footer />
    </Container>
  );
};

export default Shop;
