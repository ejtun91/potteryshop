import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { productItems } from "../data";
import ProductItem from "./ProductItem";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-self: center;
`;
const Title = styled.h1`
  margin-bottom: 3em;
  margin-left: 3em;

  ${mobile({
    marginLeft: 0,
    textAlign: "center",
    marginTop: "2em",
    fontSize: "28px",
    marginBottom: "1em",
  })}
`;
const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const ProductDashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/products");
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  //  console.log(products);

  return (
    <Container>
      <Title>PRODUCT OVERVIEW</Title>
      <ProductContainer>
        {products.slice(0, 8).map((item) => (
          <ProductItem item={item} key={item._id} id={item._id} />
        ))}
      </ProductContainer>
    </Container>
  );
};

export default ProductDashboard;
