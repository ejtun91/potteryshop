import { LocationOn, MailOutline, PhoneOutlined } from "@mui/icons-material";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { Alert } from "@mui/material";

const Container = styled.div``;
const Wrapper = styled.div`
  ${mobile({ width: "100%" })}
`;
const TitleContainer = styled.div`
  position: relative;

  ${mobile({ width: "100%" })}
`;
const Title = styled.h1`
  position: absolute;
  top: 35%;
  left: 43%;
  font-size: 50px;
  color: #717ef0;
  background-color: white;
  border-radius: 20px;
  padding: 10px;

  ${mobile({
    fontSize: "20px",
    textAlign: "center",
    right: 0,
    left: 0,
    margin: "auto",
    width: "50%",
  })}
`;
const Image = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;

  ${mobile({ width: "100%", height: "60%" })}
`;
const ContactContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5em;

  ${mobile({ flexDirection: "column", width: "60%", margin: "0 auto" })}
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2em;
  width: 550px;
  height: 600px;
  padding: 3em 5em;
  border: 1px solid #c5c5c5;

  ${mobile({ width: "100%", justifyContent: "center" })}
`;
const TitleForm = styled.h2`
  font-weight: 400;
  text-align: center;
`;
const Input = styled.input`
  padding: 15px 35px;
  border: 1px solid #c7c7c7;

  &:focus {
    outline: none;
  }
`;
const Textarea = styled.textarea`
  height: 200px;
  padding: 30px 35px;
  border: 1px solid #c7c7c7;

  &:hover {
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
  border: none;

  &:hover {
    background-color: #717ef0;
  }

  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;
const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3em;
  width: 500px;
  height: 600px;
  padding: 3em 5em;
  border: 1px solid #c5c5c5;

  ${mobile({ width: "90%" })}
`;
const Address = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${mobile({ width: "90%" })}
`;
const AddressTitle = styled.div`
  margin-left: 2em;
  font-weight: 500;
  font-size: 17px;
`;
const Desc = styled.div`
  width: 100%;
  font-size: 15px;
  color: #858585;
  position: relative;
  left: 3em;
  margin-top: 1em;
`;
const Phone = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const PhoneTitle = styled.div`
  margin-left: 2em;
  font-weight: 500;
  font-size: 17px;
`;
const Number = styled.div`
  position: relative;
  left: 3em;
  margin-top: 1em;
  width: 100%;
  color: #717ef0;
`;
const Email = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const MailTitle = styled.div`
  margin-left: 2em;
  font-weight: 500;
  font-size: 17px;
`;
const EmailAddress = styled.div`
  width: 100%;
  color: #717ef0;
  position: relative;
  left: 3em;
  margin-top: 1em;
`;

const Contact = ({ menuOpen, setMenuOpen, searchTerm, setSearchTerm }) => {
  const whiteColor = "#fff";
  const border = "1px solid #d7dbdc";
  const padding = "0.2em 0 0.2em 0";
  const [captcha, setCaptcha] = useState("");
  const formRef = useRef();
  const [error, setError] = useState(false);

  function onChange(value) {
    setCaptcha(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_krewn27",
        "template_2cmh9h6",
        formRef.current,
        "user_0mMyO4KpD1gShyhsWdpqB"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
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
          <Image src="https://images.pexels.com/photos/544492/pexels-photo-544492.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
          <Title>Contact</Title>
        </TitleContainer>
        <ContactContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <TitleForm>Send Us A Message</TitleForm>
            <Input required type="text" name="user_name" placeholder="Name" />
            <Input
              required
              type="text"
              name="user_subject"
              placeholder="Subject"
            />
            <Input
              required
              type="email"
              name="user_email"
              placeholder="Enter your email"
            />
            <Textarea
              required
              name="message"
              placeholder="How can we help?"
            ></Textarea>
            <ReCAPTCHA
              sitekey="6LdPOtccAAAAAL_xPE77YbZTkdfalByUpfoBL83O"
              onChange={onChange}
            />
            <Button type="submit" disabled={!captcha}>
              SUBMIT
            </Button>
            {error && (
              <Alert severity="error">
                Something is wrong, check your inputs!
              </Alert>
            )}
          </Form>
          <AddressContainer>
            <Address>
              <LocationOn />
              <AddressTitle>Address</AddressTitle>
              <Desc>21230 Sinj, Croatia</Desc>
            </Address>
            <Phone>
              <PhoneOutlined />
              <PhoneTitle>Lets Talk</PhoneTitle>
              <Number>+385915669199</Number>
            </Phone>
            <Email>
              <MailOutline />
              <MailTitle>Sale Support</MailTitle>
              <EmailAddress>pilesko65@gmail.com</EmailAddress>
            </Email>
          </AddressContainer>
        </ContactContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Contact;
