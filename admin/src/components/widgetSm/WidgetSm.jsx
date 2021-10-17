import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import { Link } from "react-router-dom";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("/users?new=true");
        setUsers(res.data);
      } catch (error) {}
    };
    getUsers();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Novi Korisnici</span>
      <ul className="widgetSmList">
        {users.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            <img
              src={
                user.img ||
                "https://www.pinclipart.com/picdir/middle/78-780477_about-us-avatar-icon-red-png-clipart.png"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
              <span className="widgetSmUserTitle">{user.email}</span>
            </div>
            <Link className="link" to={"/user/" + user._id}>
              <button className="widgetSmButton">
                <Visibility className="widgetSmIcon" />
                Vidi
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
