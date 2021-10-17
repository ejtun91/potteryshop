import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./user.css";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function User() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [user, setUser] = useState({});

  console.log(user.isAdmin);

  useEffect(() => {
    const getUser = async () => {
      const res = await userRequest.get("/users/find/" + path);
      setUser(res.data);
    };
    getUser();
  }, [path]);
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        {/* <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link> */}
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://www.pinclipart.com/picdir/middle/78-780477_about-us-avatar-icon-red-png-clipart.png"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.fullName}</span>
              <span className="userShowUserTitle">
                Admin: {user.isAdmin ? "DA" : "NE"}
              </span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Detalji Racuna</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              {/* <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1999</span> */}
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              {/* <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+1 123 456 67</span> */}
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              {/* <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">New York | USA</span> */}
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={user.username}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder={user.fullName}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={user.email}
                  className="userUpdateInput"
                />
              </div>
              {/* <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="+1 123 456 67"
                  className="userUpdateInput"
                />
              </div> */}
              {/* <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="New York | USA"
                  className="userUpdateInput"
                />
              </div> */}
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://www.pinclipart.com/picdir/middle/78-780477_about-us-avatar-icon-red-png-clipart.png"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button
                style={{ cursor: "not-allowed", backgroundColor: "gray" }}
                className="userUpdateButton"
                disabled
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
