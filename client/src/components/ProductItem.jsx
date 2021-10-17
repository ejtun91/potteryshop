import { FavoriteBorderOutlined } from "@mui/icons-material";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import ProductInfo from "./ProductInfo";
import axios from "axios";
import { publicRequest } from "../requestMethods";
import { useMediaQuery } from "@material-ui/core";
import { mobile } from "../responsive";

const Container = styled.div`
  margin: 1em;
`;
const Button = styled.button`
  z-index: 6;
  position: absolute;
  bottom: -70px;
  padding: 10px 30px;
  border-radius: 20px;
  transition: all 0.25s ease-in-out;
  border: none;
  cursor: pointer;
  font-weight: 400;
  font-size: 15px;
  &:hover {
    background-color: black;
    color: white;
  }
  &:focus {
    display: none;
  }

  ${mobile({ display: "none" })}
`;
const Image = styled.img`
  height: 100%;
  width: 100%;
  transition: all 0.3s ease-in-out;
  position: relative;
  object-fit: cover;
`;

const ImageContainer = styled.div`
  height: 250px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: 1px solid #e9e9e9;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  position: relative;

  &:hover ${Image} {
    transform: scale(1.17);
    position: relative;
  }

  &:hover ${Button} {
    bottom: 30px;
  }
`;

const Wrapper = styled.div`
  ${mobile({
    position: "absolute",
    height: "100%",
    zIndex: 6,
    top: 0,
    width: "100%",
  })}
`;

const Info = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Title = styled.span`
  color: #a5a5a5;
  font-size: 15px;
  width: 90%;
`;
const Price = styled.span`
  color: #4d4d4d;
  font-size: 15px;
`;

const ProductItem = ({ item, id }) => {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({});
  const matches = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/products/find/` + item._id);
        setProduct(res.data);
      } catch (error) {}
    };
    getProduct();
  }, [item._id]);

  const handleClickOpen = () => {
    setOpen(true);
    //  history.push("1231");
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Container>
        <ImageContainer>
          <Image src={item.img} />
          <Wrapper onClick={matches && handleClickOpen}></Wrapper>
          <Button onClick={!matches && handleClickOpen}>Quick View</Button>
        </ImageContainer>
        <Info>
          <Title>{item.title}</Title>
          <FavoriteBorderOutlined style={{ cursor: "pointer" }} />
          <Price>{item.price} €</Price>
        </Info>
      </Container>
      <ProductInfo product={product} open={open} handleClose={handleClose} />
    </>
  );
};

export default ProductItem;
