import {
  AccountCircle,
  MailOutline,
  PermIdentity,
  Publish,
} from "@mui/icons-material";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../../components/Announcement";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { updateLogin } from "../../redux/apiCalls";
import { publicRequest, userRequest } from "../../requestMethods";
import "./settings.css";

const Container = styled.div``;
const Wrapper = styled.div``;

const Settings = ({ searchTerm, setSearchTerm }) => {
  const whiteColor = "#fff";
  const border = "1px solid #d7dbdc";
  const padding = "0.2em 0 0.2em 0";
  const user = useSelector((state) => state.user.currentUser);
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();
  const _id = user._id;
  const userId = user._id;
  const formRef = useRef();
  const [username, setUsername] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("/orders/find/" + userId);
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  //  console.log(user.accessToken);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const address = {
      homeAddress,
      city,
      country,
      zip,
    };

    const userUpdate = {
      ...user,
      ...inputs,
      address,
    };

    updateLogin(dispatch, userId, userUpdate);
    formRef.current.reset();
  };

  // console.log(orders);

  return (
    <Container>
      <Announcement />
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        whiteColor={whiteColor}
        border={border}
        padding={padding}
      />
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">My Account</h1>
        </div>
        <div className="userContainer">
          <div className="userShow" style={{ width: "50%" }}>
            <div className="userShowTop"></div>
            <div className="userShowBottom">
              <span className="userShowTitle">Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">{user.username}</span>
              </div>
              <div className="userShowInfo">
                <AccountCircle className="userShowIcon" />
                <span className="userShowInfoTitle">{user.fullName}</span>
              </div>
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{user.email}</span>
              </div>
              <div
                className="userShowInfo"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "1em",
                }}
              >
                <span className="userShowTitle">Address</span>
                <span className="userShowInfoTitle">
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    <li>{user.address?.homeAddress}</li>
                    <li>{user.address?.city}</li>
                    <li>{user.address?.country}</li>
                    <li>{user.address?.zip}</li>
                  </ul>
                </span>
              </div>
            </div>
          </div>
          <div className="userUpdate" style={{ width: "50%" }}>
            <span className="userUpdateTitle">Edit</span>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="userUpdateForm"
            >
              <div className="userUpdateLeft" style={{ width: "50%" }}>
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    placeholder={user.username}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    onChange={handleChange}
                    placeholder={user.fullName}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Password</label>
                  <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    className="userUpdateInput"
                  />
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateItem">
                  <label>Home Address</label>
                  <input
                    name="home"
                    type="text"
                    onChange={(e) => setHomeAddress(e.target.value)}
                    placeholder={user.address?.homeAddress}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>City</label>
                  <input
                    name="city"
                    type="text"
                    onChange={(e) => setCity(e.target.value)}
                    placeholder={user.address?.city}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Country</label>
                  <input
                    name="country"
                    type="text"
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder={user.address?.country}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Zip Code | Post Code</label>
                  <input
                    name="zip"
                    type="text"
                    onChange={(e) => setZip(e.target.value)}
                    placeholder={user.address?.zip}
                    className="userUpdateInput"
                  />
                </div>
              </div>
              <button type="submit" className="userUpdateButton">
                Update
              </button>
            </form>
          </div>
        </div>
        <div
          style={{
            width: "78%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
          className="userOrders"
        >
          <div className="userTitleContainer">
            <h1 className="userTitle">My Orders</h1>
          </div>
          <div className="userShowTop"></div>
          {orders.map((order, i) => (
            <Link
              to={{
                pathname: `/singleOrder/${order._id}`,
                state: order,
              }}
              className="link"
              key={order._id}
            >
              <div
                className="userShowBottom userShowTopOrder"
                style={{
                  display: "flex",
                  flex: 2,
                  minWidth: "400px",
                  maxWidth: 400,
                  border: "1px solid lightgray",
                  padding: 20,
                  cursor: "pointer",
                  margin: ".5em",
                }}
                key={order._id}
              >
                <span className="userShowTitle">Order Number: {i + 1}</span>
                <span className="tooltiptext">Check Details</span>

                <ul
                  style={{
                    listStyle: "none",
                    display: "flex",
                    gap: "1em",
                    fontSize: 12,
                  }}
                >
                  {order.products
                    .map((item) => (
                      <li key={item._id}>
                        <img
                          style={{
                            height: 40,
                            width: 40,
                            objectFit: "contain",
                            borderRadius: 10,
                          }}
                          src={item.img}
                          alt=""
                        />
                      </li>
                    ))
                    .slice(0, 1)}
                </ul>
                <h5 style={{ marginLeft: "2em", alignSelf: "center" }}>
                  Total Amount: {order.amount} €
                </h5>

                {/* <div className="userShowInfo">
                <AccountCircle className="userShowIcon" />
                <span className="userShowInfoTitle">{user.fullName}</span>
              </div>
              <div className="userShowInfo"></div>
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo"></div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{user.email}</span>
              </div>
              <div className="userShowInfo"></div> */}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </Container>
  );
};

export default Settings;
