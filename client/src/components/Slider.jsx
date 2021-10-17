import styled from "styled-components";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { slideItems } from "../data";
import { Link } from "react-router-dom";
import { mobile } from "../responsive";

const Arrow = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "4em"};
  width: 50px;
  height: 50px;
  margin: auto;
  z-index: 2;
  cursor: pointer;
  opacity: 0.3;
  transition: 0.3s ease;
  display: flex;
  color: #717fe0;
  align-items: center;
  justify-content: center;

  &:hover {
    border-radius: 50%;
    background-color: #b9b9b9;
    opacity: 0.5;
  }

  ${mobile({ display: "none" })}
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;

  ${mobile({ width: "100%" })}
`;

const Wrapper = styled.div`
  height: 100%;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
  transition: all 1.5s ease;
  display: flex;
`;
const Slide = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.bg === "color" && "#D7DBDC"};
`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  object-fit: cover;

  ${mobile({ width: "400px" })}
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 20%;
  flex: 1;
  padding-left: 12em;

  ${mobile({
    paddingLeft: "1em",
    height: "100%",
    gap: "1em",
    justifyContent: "flex-start",
    marginTop: "20em",
  })}
`;
const Title = styled.h1`
  font-size: 45px;

  ${mobile({ fontSize: "28px" })}
`;
const Desc = styled.p`
  ${mobile({ fontSize: "15px" })}
`;
const Button = styled.button`
  width: max-content;
  padding: 10px 50px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  background-color: #717fe0;
  color: white;
  font-size: 17px;
  font-weight: 600;
  transition: 0.5s ease;

  ${mobile({ fontSize: "14px", padding: "10px 30px" })}

  &:hover {
    background-color: black;
  }
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const slider = setInterval(() => {
      handleClick("right");
    }, 4000);

    return function () {
      clearInterval(slider);
    };
  }, [slideIndex]);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined style={{ fontSize: "70px", color: "#333" }} />
      </Arrow>

      <Wrapper slideIndex={slideIndex}>
        {slideItems.map((item) => (
          <Slide bg="color" key={item.id}>
            <InfoContainer>
              <Title style={{ fontWeight: "500" }}>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Link to="/products" className="link">
                <Button>SHOP NOW</Button>
              </Link>
            </InfoContainer>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined style={{ fontSize: "70px", color: "#333" }} />
      </Arrow>
    </Container>
  );
};

export default Slider;
