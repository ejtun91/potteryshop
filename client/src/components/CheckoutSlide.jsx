import styled from "styled-components";
import "../App.css";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../requestMethods";
import { removeAllProducts, removeProduct } from "../redux/cartRedux";
import { Alert } from "@mui/material";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div`
  height: 100vh;
  width: 400px;
  display: flex;
  flex-direction: column;
  padding: 3em;
  position: fixed;
  top: 0;
  background-color: white;
  // border-left: 1px solid #bebebe;
  transition: all 0.7s ease;
  box-sizing: border-box;
  z-index: 999;
  overflow-y: scroll;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex: 0.5;
  margin-bottom: 2em;
`;
const Title = styled.h3``;
const Cancel = styled.span`
  font-size: 25px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    color: #717fe0;
  }
`;
const ItemsContainer = styled.div`
  flex: 5;
`;
const ItemContainer = styled.div`
  display: flex;
  margin-bottom: 1em;
`;
const Wrapper = styled.div`
  position: absolute;
  top: 0;
  height: 100px;
  width: 90px;
  background-color: #363636;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 17px;
  font-weight: 700;
  opacity: 0;
  transition: all 0.7s ease;
  border-radius: 5px;
`;
const ImageContainer = styled.div`
  position: relative;
  cursor: pointer;

  &:hover ${Wrapper} {
    opacity: 0.5;
  }
`;

const Image = styled.img`
  background-color: lightgray;
  object-fit: fill;
  height: 100px;
  width: 90px;
  border-radius: 5px;

  &:hover {
    opacity: 0.5;
  }
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1em;
  color: #797979;
`;
const ItemTitle = styled.span`
  width: 100%;
  font-weight: 600;
  color: #3a3a3a;
`;
const Quantity = styled.span`
  margin-right: 0.4em;
  font-weight: 400;
  font-size: 15px;
`;
const Price = styled.span`
  font-weight: 400;
  font-size: 15px;
`;
const Size = styled.span`
  font-weight: 400;
  font-size: 15px;
`;
const Total = styled.span`
  flex: 0.5;
  font-size: 18px;
  color: #4e4e4e;
`;
const ButtonsContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
`;
const Button = styled.button`
  background-color: #1f1f1f;
  color: white;
  padding: 10px 30px;
  border-radius: 20px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s ease;
  width: 100%;

  &:hover {
    background-color: #717fe0;
  }
  &:disabled {
    cursor: not-allowed;
    background-color: lightgray;
  }
`;

const CheckoutSlide = ({ openCheckout, setOpenCheckout }) => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total,
        });
        console.log(res.data);
        history.push("/success", {
          data: res.data,
          products: cart.products,
        });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, history]);

  const handleDelete = (product) => {
    dispatch(removeProduct({ ...product }));
    // console.log(id);
    console.log(dispatch(removeProduct({ ...product })));
  };

  return (
    <>
      <Container className={openCheckout ? "checkOpen" : "check"}>
        <Header>
          <Title>YOUR CART</Title>
          <Cancel onClick={() => setOpenCheckout(!openCheckout)}>X</Cancel>
        </Header>
        <ItemsContainer>
          {cart.products.map((product) => (
            <ItemContainer key={product._id}>
              <ImageContainer>
                <Image src={product.img} />
                <Wrapper onClick={() => handleDelete(product)}>X</Wrapper>
              </ImageContainer>
              <Info>
                <ItemTitle>{product.title.toUpperCase()}</ItemTitle>
                <Quantity>Quantity: {product.quantity}</Quantity>
                <Size>Size: {product.size}</Size>
                <Price>Price: {product.price} €</Price>
              </Info>
            </ItemContainer>
          ))}
        </ItemsContainer>

        <Total>{cart.total ? cart.total + " €" : ""}</Total>
        <ButtonsContainer>
          {stripeToken ? (
            <span style={{ width: "100%" }}>Processing. Please wait....</span>
          ) : (
            <>
              <Link style={{ width: "100%" }} className="link" to={`/cart`}>
                <Button>VIEW CART</Button>
              </Link>

              {/* <StripeCheckout
                name="G. PEKE SHOP"
                image=""
                billingAddress
                shippingAddress
                description={`Your total is ${cart.total} €`}
                amount={cart.total * 100}
                token={onToken}
                stripeKey={KEY}
                currency="EUR"
              >
                <Button disabled={!user || cart.total === 0}>CHECK OUT</Button>
              </StripeCheckout> */}
            </>
          )}
        </ButtonsContainer>
      </Container>
      <div
        className={`Overlay ${openCheckout ? "Show" : ""}`}
        onClick={() => setOpenCheckout(false)}
      />
    </>
  );
};

export default CheckoutSlide;
