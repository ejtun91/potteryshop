import { useLocation } from "react-router";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Container = styled.div``;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  gap: 1em;
  justify-content: center;
  align-items: center;
  margin-top: 4em;
`;
const WrapperProducts = styled.div`
  border-top: 1px solid #d3d3d3;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
  width: 50%;
  height: max-content;
`;
const WrapperProduct = styled.div``;
const TitlesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #d3d3d3;
  padding: 1em 0;
`;
const CartContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 2em 0;
  border-bottom: 1px solid #d3d3d3;
`;
const Title = styled.h5`
  flex: 1;
  text-align: center;
`;
const Price = styled.span``;
const WrapperImage = styled.div`
  position: absolute;
  top: 0;
  height: 80px;
  width: 70px;
  background-color: #363636;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 17px;
  font-weight: 700;
  opacity: 0;
  transition: all 0.7s ease;
`;
const ImageContainer = styled.div`
  position: relative;
  cursor: pointer;

  &:hover ${WrapperImage} {
    opacity: 0.5;
  }
`;

const Image = styled.img`
  background-color: lightgray;
  object-fit: fill;
  height: 80px;
  width: 70px;

  &:hover {
    opacity: 0.5;
  }
`;
const AddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #e2e2e2;
  padding: 0.3em;
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  background-color: #e4e4e4;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Total = styled.h2``;

const Singleorder = () => {
  const whiteColor = "#fff";
  const border = "1px solid #d7dbdc";
  const padding = "0.2em 0 0.2em 0";
  const { state } = useLocation();
  return (
    <Container>
      <Announcement />
      <Navbar whiteColor={whiteColor} border={border} padding={padding} />
      <Wrapper>
        <WrapperProducts>
          <TitlesContainer>
            <Title>PRODUCT</Title>
            <Title>PRICE</Title>
            <Title>QUANTITY</Title>
            <Title>TOTAL PER ITEM</Title>
          </TitlesContainer>
          {state.products.map((item) => (
            <WrapperProduct key={item._id}>
              <CartContainer>
                <ImageContainer>
                  <Image src={item.img} />
                  <WrapperImage>X</WrapperImage>
                </ImageContainer>
                <Price>{item.price} €</Price>
                <AddContainer>
                  <AmountContainer>
                    <Amount>{item.quantity}</Amount>
                  </AmountContainer>
                </AddContainer>
                <Price>{item.price * item.quantity} €</Price>
              </CartContainer>
            </WrapperProduct>
          ))}
        </WrapperProducts>
        <Total>Total Amount for this order: {state.amount} €</Total>
        <Title>Status: {state.status.toUpperCase()}</Title>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Singleorder;
