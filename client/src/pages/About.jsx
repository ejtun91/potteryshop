import React from "react";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Footer from "../components/Footer";
import { mobile } from "../responsive";

const Container = styled.div``;
const Wrapper = styled.div`
  ${mobile({ marginTop: "8em" })}
`;
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
  z-index: 555;

  ${mobile({ height: "100px" })}
`;
const Title = styled.h1`
  font-size: 50px;
  font-weight: 900;
  color: #717ef0;
  background-color: white;
  border-radius: 20px;
  padding: 10px;

  ${mobile({ fontSize: "30px" })}
`;
const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3em;
  gap: 5em;
`;
const StoryOne = styled.div`
  display: flex;
  justify-content: space-around;

  ${mobile({ flexDirection: "column" })}
`;
const Cont = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  align-items: center;
  justify-content: center;
  gap: 2em;

  ${mobile({ width: "100%" })}
`;
const StoryTitle = styled.h2`
  align-self: flex-start;

  ${mobile({ alignSelf: "center" })}
`;
const Desc = styled.p`
  line-height: 1.7;
  font-size: 15px;
  font-weight: 400;
  color: #868686;

  ${mobile({ width: "90%", marginBottom: "1em" })}
`;
const ImageContainer = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${mobile({ width: "90%", margin: "0 auto" })}
`;
const Image = styled.img`
  width: 500px;
  height: 500px;

  ${mobile({ width: "100%", height: "50%" })}
`;
const StoryTwo = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;

  ${mobile({ flexDirection: "column" })}
`;
const Video = styled.iframe`
  height: 350px;
  width: 600px;
`;

const About = ({ menuOpen, setMenuOpen, setSearchTerm, searchTerm }) => {
  const whiteColor = "#fff";
  const border = "1px solid #d7dbdc";
  const padding = "0.2em 0 0.2em 0";
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
          <Title>About</Title>
        </TitleContainer>
        <AboutContainer>
          <StoryOne>
            <Cont>
              <StoryTitle>Our Story</StoryTitle>
              <Desc>
                We are a family that comes from a small village near Split in
                Croatia. For hundreds of years, our families have been producing
                these products. These handmade dishes were previously used by
                people as the main tool for food. Today, only a few people
                produce these products on the entire planet. We offer many types
                of goods, you can cook with them, give it to a friend or even
                use it for plants, you name it. Comparing the taste of food
                between clay pots and a standard dish, this is on a different
                level. Try it, make your stomach happy!
              </Desc>
            </Cont>
            <ImageContainer>
              <Image src="https://images.pexels.com/photos/357428/pexels-photo-357428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
            </ImageContainer>
          </StoryOne>
          <StoryTwo>
            <Cont>
              <StoryTitle>Our Mission</StoryTitle>
              <Desc>
                On the left is a small video clip where you can see how we make
                them. All with bare hands, the procedure is long for one clay
                vessel, because there are several stages after you make it.
                Since this material is a compound between several ingredients,
                the clay must go through a drying process and then firing. This
                whole process takes about 2 weeks and after that, they are ready
                for your oven.
              </Desc>
            </Cont>
            <ImageContainer>
              <Video
                src="https://www.youtube.com/embed/tvNSss45e_E"
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowfullscreen
                title="video"
              />
            </ImageContainer>
          </StoryTwo>
        </AboutContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default About;
