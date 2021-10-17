import { Alert } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import ReCAPTCHA from "react-google-recaptcha";

const Container = styled.div``;
const Wrapper = styled.div``;
const TitleContainer = styled.div`
  height: 200px;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/2892268/pexels-photo-2892268.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
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
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 550px;
  height: 600px;
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
    cursor: not-allowed;
    background-color: gray;
  }
`;

const Register = ({ menuOpen, setMenuOpen, searchTerm, setSearchTerm }) => {
  const whiteColor = "#fff";
  const border = "1px solid #d7dbdc";
  const padding = "0.2em 0 0.2em 0";

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passValid, setPassValid] = useState(false);
  const [error, setError] = useState(false);
  const [captcha, setCaptcha] = useState("");

  function onChange(value) {
    setCaptcha(value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    const newUser = {
      fullName,
      username,
      password,
      email,
    };
    if (confirmPass === password) {
      setPassValid(false);
      try {
        const res = await axios.post(
          "http://localhost:4000/api/auth/register",
          newUser
        );
        res.data && window.location.replace("/login");
        setError(false);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    } else {
      setPassValid(true);
    }
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
          <Title>Register</Title>
        </TitleContainer>
        <ContactContainer>
          <Form onSubmit={handleSubmit}>
            <TitleForm>Register</TitleForm>
            <Input
              onChange={(e) => setFullName(e.target.value)}
              placeholder="enter your full name"
              type="text"
            />
            <Input
              onChange={(e) => setUsername(e.target.value)}
              placeholder="enter your username"
              type="text"
            />
            <Input
              onChange={(e) => setEmail(e.target.value)}
              placeholder="enter your email"
              type="email"
            />
            <Input
              onChange={(e) => setPassword(e.target.value)}
              placeholder="enter your password"
              type="password"
            />
            <Input
              onChange={(e) => setConfirmPass(e.target.value)}
              placeholder="confirm your password"
              type="password"
            />
            <ReCAPTCHA
              sitekey="6LdPOtccAAAAAL_xPE77YbZTkdfalByUpfoBL83O"
              onChange={onChange}
            />
            <Button type="submit" disabled={captcha.length < 1}>
              REGISTER
            </Button>
            {passValid && (
              <Alert severity="error">Passwords do not match!</Alert>
            )}
            {error && (
              <Alert severity="error">
                Something is wrong, check your inputs!
              </Alert>
            )}
          </Form>
        </ContactContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Register;
