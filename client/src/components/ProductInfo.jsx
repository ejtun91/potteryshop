import styled from "styled-components";
import { Modal } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import { Clear } from "@mui/icons-material";
import { useState } from "react";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { Alert } from "@mui/material";
import { mobile } from "../responsive";

const Container = styled.div``;
const Wrapper = styled.div`
  display: flex;
  width: 1000px;
  background-color: white;
  justify-content: space-around;
  position: relative;
  left: 0;
  right: 0;
  margin: auto;
  top: 20%;
  padding: 4em;
  border-radius: 5px;
  transition: all 0.2s ease-out;

  ${mobile({
    width: "220px",
    flexDirection: "column",
    alignItems: "center",
    top: "5%",
  })}
`;
const Close = styled.span``;
const ImageContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${mobile({ height: "fit-content" })}
`;
const Image = styled.img`
  background-color: #e7e7e7;
  height: 400px;
  width: 450px;
  object-fit: cover;
  ${mobile({ height: "250px", width: "300px", objectFit: "fill" })}
`;
const Info = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  ${mobile({ width: "320px", textAlign: "center", gap: "1em" })}
`;
const Title = styled.h2`
  font-weight: 600;

  ${mobile({ width: "90%", fontSize: "20px" })}
`;
const Price = styled.span`
  font-size: 19px;
  font-weight: 600;
`;
const Desc = styled.p`
  font-size: 15px;
  white-space: pre-line;
  color: #777777;

  ${mobile({})}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
`;
const FilterTitle = styled.span`
  margin-right: 1em;
`;
const FilterSize = styled.select``;
const FilterSizeOption = styled.option``;
const AddAndButton = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ height: "40px", width: "100%" })}
`;
const AddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #dbdbdb;
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  height: 100%;
  width: 100%;
`;
const Amount = styled.span`
  background-color: #e4e4e4;
  height: 100%;
  width: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Remove = styled.span`
  height: 100%;
  width: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const Add = styled.span`
  height: 100%;
  width: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const Button = styled.button`
  width: 50%;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #717ef0;
  color: white;

  &:hover {
    background-color: #363636;
  }
`;

const ProductInfo = ({ handleClose, open, product }) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [optionSelected, setOptionSelected] = useState(false);
  const dispatch = useDispatch();

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    //update cart
    if (size.length > 0) {
      dispatch(addProduct({ ...product, quantity, size }));
      handleClose();
    } else {
      setOptionSelected(true);
    }
  };

  return (
    <Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Wrapper>
          <Clear
            onClick={handleClose}
            style={{
              position: "absolute",
              top: "-40px",
              right: "10px",
              fontSize: "35px",
              WebkitTextStrokeWidth: "5px",
              color: "#f0f0f0",
              cursor: "pointer",
            }}
          >
            X
          </Clear>
          <ImageContainer>
            <Image src={product.img} />
          </ImageContainer>
          <Info>
            <Title>{product.title}</Title>
            <Price>{product.price} €</Price>
            <Desc>{product.desc}</Desc>
            <Filter>
              <FilterTitle>Size: </FilterTitle>
              <FilterSize
                defaultValue="Options"
                onChange={(e) => setSize(e.target.value)}
              >
                <FilterSizeOption value="Options" disabled>
                  Options
                </FilterSizeOption>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s} cm</FilterSizeOption>
                ))}
              </FilterSize>
              {optionSelected && (
                <Alert severity="error">Please select an option!</Alert>
              )}
            </Filter>
            <AddAndButton>
              <AddContainer>
                <AmountContainer>
                  <Remove onClick={() => handleQuantity("dec")}>-</Remove>
                  <Amount>{quantity}</Amount>
                  <Add onClick={() => handleQuantity("inc")}>+</Add>
                </AmountContainer>
              </AddContainer>
              <Button onClick={handleClick}>ADD TO CART</Button>
            </AddAndButton>
          </Info>
        </Wrapper>
      </Modal>
    </Container>
  );
};

export default ProductInfo;
