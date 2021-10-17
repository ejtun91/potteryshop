import { useState } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProductDashboard from "../components/ProductDashboard";
import Slider from "../components/Slider";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Home = ({ menuOpen, setMenuOpen, searchTerm, setSearchTerm }) => {
  return (
    <Container>
      <Announcement setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <Slider />
      <Categories />
      <ProductDashboard />
      <Footer />
    </Container>
  );
};

export default Home;
