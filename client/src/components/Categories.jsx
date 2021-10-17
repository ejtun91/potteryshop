import styled from "styled-components";
import { categories } from "../data";
import CategoryItem from "./CategoryItem";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6em;
  margin-top: 3em;
  margin-left: 4em;

  ${mobile({
    flexDirection: "column",
    margin: "1em 0 0 1em",
    justifyContent: "center",
    gap: "1em",
  })}
`;

const Categories = () => {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
