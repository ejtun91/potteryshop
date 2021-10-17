import { Facebook, Instagram, Pinterest } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { categories } from "../data";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15em;
  background-color: #222222;
  color: white;
  height: 50vh;

  ${mobile({ height: "100%", padding: "1em 1em" })}
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 70%;
  margin-top: 5em;
  flex-wrap: wrap;

  ${mobile({
    flexDirection: "column",
    justifyContent: "flex-start",
    flexWrap: "nowrap",
    gap: "1em",
    marginTop: 0,
    width: "100%",
  })}
`;
const FooterContainer = styled.div`
  height: 50%;
  flex: 1;
  display: flex;
  flex-direction: column;

  ${mobile({ flex: 0 })}
`;
const Title = styled.h4``;
const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2em 0 0 0;
`;
const ListItem = styled.li`
  color: #b2b2b2;
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 1em;
  cursor: pointer;
  transition: all 0.3s ease;
  width: max-content;

  &:hover {
    color: #717fe0;
  }
`;
const Desc = styled.p`
  font-size: 14px;
  color: #b2b2b2;
  margin-top: 2em;
`;
const IconContainer = styled.div`
  display: flex;
  margin-top: 3em;
`;
const Icon = styled.div`
  margin-right: 1em;
  cursor: pointer;
`;
const Input = styled.input`
  margin-top: 2em;
  background-color: transparent;
  color: #b2b2b2;
  border: none;
  border-bottom: 1px solid #636363;

  &:focus {
    outline: none;
  }
`;
const Button = styled.button`
  width: max-content;
  margin-top: 2em;
  padding: 10px 50px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  background-color: #717fe0;
  color: white;
  font-size: 17px;
  font-weight: 600;
  transition: 0.5s ease;
  font-size: 15px;
  font-weight: 400;

  &:hover {
    background-color: white;
    color: #717fe0;
  }
`;

const RightsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
const Image = styled.img`
  height: 20px;
  width: 180px;
`;
const DescCopy = styled.span`
  font-size: 13px;
  color: #b2b2b2;
  font-weight: 300;

  ${mobile({ textAlign: "center", marginTop: "1em" })}
`;

const Footer = () => {
  const [success, setSuccess] = useState(false);
  //  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  }, [success]);

  const handleClick = () => {
    setSuccess(true);
  };

  return (
    <Container>
      <Wrapper>
        <FooterContainer>
          <Title>CATEGORIES</Title>
          <List>
            {categories.map((item) => (
              <Link key={item.id} className="link" to={`/products/${item.cat}`}>
                <ListItem>{item.title}</ListItem>
              </Link>
            ))}

            {/* <ListItem>Peke</ListItem>
            <ListItem>Bakre</ListItem>
            <ListItem>Tece</ListItem> */}
          </List>
        </FooterContainer>
        <FooterContainer>
          <Title>HELP</Title>
          <List>
            <Link to="/cart" className="link">
              <ListItem>Cart</ListItem>
            </Link>
            <ListItem>Returns</ListItem>
            <ListItem>Shipping</ListItem>
            <ListItem>FAQs</ListItem>
          </List>
        </FooterContainer>
        <FooterContainer>
          <Title>GET IN TOUCH</Title>
          <Desc>
            Any questions? Let us know in store at Sinj, 21230, Croatia or call
            us on +1 234 56 78
          </Desc>
          <IconContainer>
            <Icon>
              <Facebook className="icon" style={{ color: "#b2b2b2" }} />
            </Icon>
            <Icon>
              <Instagram style={{ color: "#b2b2b2" }} />
            </Icon>
            <Icon>
              <Pinterest style={{ color: "#b2b2b2" }} />
            </Icon>
          </IconContainer>
        </FooterContainer>
        <FooterContainer>
          <Title>NEWSLETTER</Title>
          <Input placeholder="email@example.com" />
          <Button onClick={handleClick}>SUBSCRIBE</Button>
          {success && (
            <span style={{ color: "white", marginTop: "1em" }}>
              You are subscribed....
            </span>
          )}
        </FooterContainer>
        <RightsContainer>
          <Image src="https://i.ibb.co/D9LM0fS/payment.png" />
          <DescCopy>
            Copyright &copy; 2021. All rights reserved | Made by
            <span style={{ cursor: "pointer", fontWeight: 600 }}>
              {" "}
              Antonio K
            </span>
          </DescCopy>
        </RightsContainer>
      </Wrapper>
    </Container>
  );
};

export default Footer;
