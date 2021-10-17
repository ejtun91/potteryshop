import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { removeAllProducts } from "../redux/cartRedux";
import { userRequest } from "../requestMethods";
import { useDispatch } from "react-redux";

const Container = styled.div``;

const Success = () => {
  const location = useLocation();
  const order = location.state.data;
  const products = location.state.products;
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  console.log(products);

  const handleClick = () => {
    dispatch(removeAllProducts());
  };

  useEffect(() => {
    const getOrder = async () => {
      try {
        await userRequest.post("/orders", {
          userId: user._id,
          amount: order.amount,
          address: order.billing_details.address,
          products: products,
        });
      } catch (error) {}
    };
    getOrder();
  }, [location]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Successfull. Your order is being prepared...
      <Link to="/" style={{ padding: 10, marginTop: 20 }}>
        <span onClick={handleClick}>Go to Homepage</span>
      </Link>
    </div>
  );
};

export default Success;
