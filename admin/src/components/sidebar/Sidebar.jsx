import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { Link, NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <NavLink
                style={{ display: "flex", alignItems: "center" }}
                exact
                activeClassName="active"
                to="/"
                className="link"
              >
                <LineStyle className="sidebarIcon" />
                Home
              </NavLink>
            </li>
            {/* <Link className="link" to="/cart">
              <li className="sidebarListItem">
                <Timeline className="sidebarIcon" />
                Kosarica
              </li>
            </Link> */}

            <li className="sidebarListItem">
              <NavLink
                style={{ display: "flex", alignItems: "center" }}
                activeClassName="active"
                to="/sales"
                className="link"
              >
                <TrendingUp className="sidebarIcon" />
                Prodaja
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <NavLink
                style={{ display: "flex", alignItems: "center" }}
                activeClassName="active"
                to="/users"
                className="link"
              >
                <PermIdentity className="sidebarIcon" />
                Korisnici
              </NavLink>
            </li>
            <li className="sidebarListItem">
              <NavLink
                style={{ display: "flex", alignItems: "center" }}
                activeClassName="active"
                to="/products"
                className="link"
              >
                <Storefront className="sidebarIcon" />
                Proizvodi
              </NavLink>
            </li>
            <li className="sidebarListItem">
              <NavLink
                style={{ display: "flex", alignItems: "center" }}
                activeClassName="active"
                to="/orders"
                className="link"
              >
                <AttachMoney className="sidebarIcon" />
                Narudzbe
              </NavLink>
            </li>
            <li className="sidebarListItem">
              <NavLink
                style={{ display: "flex", alignItems: "center" }}
                activeClassName="active"
                to="/newproduct"
                className="link"
              >
                <BarChart className="sidebarIcon" />
                Novi Proizvod
              </NavLink>
            </li>
          </ul>
        </div>
        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
}
