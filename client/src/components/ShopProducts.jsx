import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory, useLocation } from "react-router";
import styled from "styled-components";
import { productItems } from "../data";
import ProductItem from "./ProductItem";
import { mobile } from "../responsive";
import { categories } from "../data";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-weight: 300;
  margin-top: 1em;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
  padding: 2em 0;

  ${mobile({ justifyContent: "center" })}
`;
const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;
const Option = styled.option``;

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 80%;
`;

const ShopProducts = ({ searchTerm }) => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  console.log(searchTerm);

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const history = useHistory();

  const getPath = () => {
    let path = "";
    if (searchTerm.length < 1 && cat !== undefined) {
      path = `http://localhost:4000/api/products?category=${cat}`;
    } else if (searchTerm.length > 1 && cat !== undefined) {
      path = `http://localhost:4000/api/products?search=${searchTerm}`;
    } else {
      path = `http://localhost:4000/api/products`;
    }

    return path;
  };

  // console.log(searchTerm.length);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(getPath());
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [cat, searchTerm]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((item) =>
        Object.entries(filters).every(([key, value]) =>
          item[key].includes(value)
        )
      )
    );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  // console.log(filteredProducts);

  return (
    <Container>
      <Title>{cat ? "Category: " + cat.toUpperCase() : ""}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          {/* <Select name="color" onChange={handleFilters}>
            <Option disabled>Category</Option>
            <Option>peka</Option>
            <Option>bakra</Option>
            <Option>lonac</Option>
            <Option>teca</Option>
            <Option>suvenir</Option>
          </Select> */}
          <Select defaultValue="Options" name="size" onChange={handleFilters}>
            <option value="Options" disabled>
              Size
            </option>
            <Option>30</Option>
            <Option>50</Option>
            <Option>70</Option>
            <Option>80</Option>
            <Option>150</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <ProductContainer>
        {filteredProducts.map((item) => (
          <ProductItem item={item} key={item._id} />
        ))}
      </ProductContainer>
    </Container>
  );
};

export default ShopProducts;
