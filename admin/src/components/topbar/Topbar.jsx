import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/apiCalls";

export default function Topbar() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    logOut(dispatch);
    window.location.replace("/login");
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">pile admin</span>
        </div>
        <div className="topRight">
          {/* <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div> */}
          <img
            src="https://www.pinclipart.com/picdir/middle/78-780477_about-us-avatar-icon-red-png-clipart.png"
            alt=""
            className="topAvatar"
          />
          <button
            style={{
              marginLeft: "1em",
              cursor: "pointer",
              border: "none",
              backgroundColor: "#6dc0f0",
              color: "white",
              padding: 5,
              borderRadius: 10,
              fontWeight: 600,
            }}
            onClick={handleLogout}
          >
            Odjavi Me
          </button>
        </div>
      </div>
    </div>
  );
}
