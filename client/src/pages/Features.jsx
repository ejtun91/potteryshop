import { Add, Remove } from "@mui/icons-material";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import StripeCheckout from "react-stripe-checkout";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";

import {
  incrementProduct,
  removeProduct,
  decrementProduct,
  addProduct,
  addProducts,
} from "../redux/cartRedux";
import { publicRequest, userRequest } from "../requestMethods";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ${mobile({
    marginTop: "6em",
  })}
`;
const MainTitle = styled.h1`
  margin-top: 1em;

  ${mobile({
    textAlign: "center",
  })}
`;
const Wrapper = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-around;
  margin-top: 4em;

  ${mobile({
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  })}
`;
const WrapperProducts = styled.div`
  border-top: 1px solid #d3d3d3;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
  width: 50%;
  height: max-content;

  ${mobile({
    width: "95%",
    margin: "0 auto",
  })}
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
const Title = styled.h5``;
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
const TotalsContainer = styled.div`
  width: 350px;
  border: 1px solid #d3d3d3;
  padding: 2em;
  display: flex;
  flex-direction: column;

  ${mobile({
    width: "80%",
    margin: "0 auto",
  })}
`;
const TitleTotal = styled.h2``;
const Subtotal = styled.span`
  display: flex;
  justify-content: space-around;
  width: 55%;
  margin: 1.5em 0 0.5em 0;
`;
const ShippingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${mobile({
    width: "95%",
  })}
`;
const Desc = styled.p`
  display: flex;
  justify-content: space-around;
  margin-bottom: 1em;
`;
const Input = styled.input`
  width: 50%;
  align-self: flex-end;
  margin-bottom: 1em;
  border: 1px solid #dadada;
  padding: 10px;

  &:focus {
    outline: none;
  }

  ${mobile({
    marginRight: "1em",
  })}
`;
const Button = styled.button`
  margin-bottom: 1em;
  width: 50%;
  position: relative;
  left: 48%;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #717ef0;
    color: white;
  }
`;
const Hr = styled.hr`
  border: 1px dashed #cccccc;
  margin: 1em;
`;
const Summary = styled.span`
  display: flex;
  justify-content: space-around;
  width: 55%;
  margin: 1em 0 1.5em 0;
`;
const CheckoutButton = styled.button`
  width: 90%;
  padding: 10px 30px;
  border-radius: 20px;
  border: none;
  margin: 0 auto;
  font-size: 17px;
  cursor: pointer;
  background-color: #333333;
  color: white;
  transition: all 0.3s ease;

  &:hover {
    background-color: #717ef0;
  }
  &:disabled {
    cursor: not-allowed;
    background-color: lightgray;
  }
`;

const Features = ({ menuOpen, setMenuOpen, searchTerm, setSearchTerm }) => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const whiteColor = "#fff";
  const border = "1px solid #d7dbdc";
  const padding = "0.2em 0 0.2em 0";
  const [products, setProducts] = useState([]);
  let filters = [];
  const quantity = 1;
  const size = "70 cm";
  const size1 = "150";

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  const onToken = (token) => {
    setStripeToken(token);
  };

  products.filter((item) => {
    if (
      item.title.toLowerCase() === "pottery dish with cover" ||
      item.title.toLowerCase() === "pottery dish"
    ) {
      filters.push(item);
    }
  });

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
  };
  const handleCart = () => {
    dispatch(addProduct({ ...filters[0], quantity, size }));
    dispatch(addProduct({ ...filters[1], quantity, size: size1 }));
  };

  return (
    <>
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
      <Container>
        <MainTitle>This is our best seller combo!</MainTitle>

        <Wrapper>
          <WrapperProducts>
            <TitlesContainer>
              <Title>PRODUCT</Title>
              <Title>PRICE</Title>
              <Title>QUANTITY</Title>
              <Title>TOTAL</Title>
            </TitlesContainer>
            {filters.map((product, i) => (
              <WrapperProduct key={i}>
                <CartContainer>
                  <ImageContainer>
                    <Image src={product.img} />
                    <WrapperImage onClick={() => handleDelete(product)}>
                      X
                    </WrapperImage>
                  </ImageContainer>
                  <Price>{product.price} €</Price>
                  <AddContainer>
                    <AmountContainer>
                      <Amount>1</Amount>
                    </AmountContainer>
                  </AddContainer>
                  <Price>{product.price} €</Price>
                </CartContainer>
              </WrapperProduct>
            ))}
            <Button onClick={handleCart} style={{ marginTop: "3em" }}>
              Add to cart
            </Button>
          </WrapperProducts>

          <TotalsContainer>
            <TitleTotal>CART TOTALS</TitleTotal>
            <Subtotal>
              <span style={{ fontWeight: "500" }}>Subtotal:</span>{" "}
              <span>{cart.total} €</span>
            </Subtotal>
            <Hr />
            <ShippingContainer>
              <Desc>
                <span style={{ fontWeight: "500" }}>Shipping: </span>
                <span style={{ width: "60%", color: "#8f8f8f" }}>
                  There are no shipping methods available. Please double check
                  your address, or contact us if you need any help.
                </span>
              </Desc>
              <Input placeholder="state/country" />
              <Input placeholder="Home address" />
              <Input placeholder="Postcode/Zip" />
              <Button>UPDATE TOTALS</Button>
            </ShippingContainer>
            <Hr />
            <Summary>
              <span style={{ fontWeight: "500" }}>Total:</span>{" "}
              <span>{cart.total} €</span>
            </Summary>
            {stripeToken ? (
              <span>Processing. Please wait....</span>
            ) : (
              <StripeCheckout
                name="G. PEKE SHOP"
                image=""
                billingAddress
                shippingAddress
                description={`Your total is ${cart.total} €`}
                amount={cart.total * 100}
                token={onToken}
                stripeKey={KEY}
              >
                <CheckoutButton disabled={cart.total === 0}>
                  PROCEED TO CHECKOUT
                </CheckoutButton>
              </StripeCheckout>
            )}
          </TotalsContainer>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default Features;
