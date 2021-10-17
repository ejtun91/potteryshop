import { useState } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { mobile } from "../responsive";

const Container = styled.div``;
const Wrapper = styled.div``;
const TitleContainer = styled.div`
  height: 200px;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/2162938/pexels-photo-2162938.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;

  ${mobile({ height: "100px" })}
`;
const Title = styled.h1`
  font-size: 50px;
  font-weight: 900;
  color: #717ef0;
  background-color: white;
  border-radius: 20px;
  padding: 10px;

  ${mobile({ fontSize: "20px" })}
`;

const ContactContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5em;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 550px;
  height: 500px;
  padding: 3em 5em;
  border: 1px solid #c5c5c5;
`;
const TitleForm = styled.h2`
  font-weight: 600;
  text-align: center;
`;
const Input = styled.input`
  padding: 10px 35px;
  border: 1px solid #c7c7c7;

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 80%;
  background-color: #292929;
  color: white;
  text-align: center;
  padding: 10px 20px;
  border-radius: 20px;
  align-self: center;
  cursor: pointer;
  transition: 0.3s ease;
  margin-top: 3em;
  border: none;

  &:hover {
    background-color: #717ef0;
  }
  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;
const Error = styled.span`
  color: red;
  text-align: center;
`;
const LinkReg = styled.span`
  margin: 5px 0;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 1em;
`;

const Login = ({ menuOpen, setMenuOpen, searchTerm, setSearchTerm }) => {
  const whiteColor = "#fff";
  const border = "1px solid #d7dbdc";
  const padding = "0.2em 0 0.2em 0";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

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
      <Wrapper>
        <TitleContainer>
          <Title>Login</Title>
        </TitleContainer>
        <ContactContainer>
          <Form>
            <TitleForm>Login</TitleForm>
            <Input
              onChange={(e) => setUsername(e.target.value)}
              placeholder="enter your username"
            />
            <Input
              onChange={(e) => setPassword(e.target.value)}
              placeholder="enter your password"
              type="password"
            />
            <Button onClick={handleClick} disabled={isFetching}>
              LOGIN
            </Button>
            {error && <Error>wrong credentials...</Error>}
            <Link to="/register" className="link">
              <LinkReg>YOU DON'T HAVE AN ACCOUNT? REGISTER</LinkReg>
            </Link>
          </Form>
        </ContactContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Login;
