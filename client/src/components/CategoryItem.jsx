import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const Image = styled.img`
  height: 70%;
  max-width: 100%;
  object-fit: cover;
  ${mobile({ height: "50%", marginLeft: "1.5em" })}
`;

const Button = styled.span`
  position: relative;
  bottom: -100px;
`;

const Title = styled.h2`
  color: #3f3f3f;
  font-size: 20px;
`;

const Container = styled.div`
  height: 300px;
  width: 400px;
  margin-right: 2.5em;
  display: flex;
  border: 1px solid #cccccc;
  cursor: pointer;
  transition: all 0.3s ease;

  ${mobile({ width: "350px", marginRight: "1em" })}

  &:hover ${Image} {
    opacity: 0.3;
  }

  &:hover {
    background-color: #717fe0;
    color: white;
  }

  &:hover ${Button} {
    border-bottom: 1px solid #fff;
    width: max-content;
    transition: 0.4s ease;
    bottom: 10px;
    border-bottom: 1px solid white;
  }
  &:hover ${Title} {
    color: white;
  }
`;
const ImageContainer = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 1em;
  flex: 1.3;
  overflow: hidden;
`;

const CategoryItem = ({ item }) => {
  return (
    <Link className="link" to={`/products/${item.cat}`}>
      <Container>
        <Info>
          <Title>{item.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
        <ImageContainer>
          <Image src={item.img} />
        </ImageContainer>
      </Container>
    </Link>
  );
};

export default CategoryItem;
