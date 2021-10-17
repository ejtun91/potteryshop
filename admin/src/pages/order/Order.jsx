import { Link } from "react-router-dom";
import "./order.css";
import Chart from "../../components/chart/Chart";
import { Publish } from "@material-ui/icons";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { updateProduct } from "../../redux/apiCalls";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

export default function Order() {
  const location = useLocation();
  const orderId = location.pathname.split("/")[2];
  const [order, setOrder] = useState({});
  const dispatch = useDispatch();
  const [options, setOptions] = useState("");

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getOrder = async () => {
      const res = await userRequest.get("/orders/findOrder/" + orderId);
      setOrder(res.data);
    };
    getOrder();
  }, [orderId]);

  const handleClick = async () => {
    try {
      const res = await userRequest.put("/orders/" + orderId, {
        status: options,
      });
      res.data && window.location.replace("/orders");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="order">
      <div className="orderTitleContainer">
        <h1 className="orderTitle">Narudzba</h1>
        {/* <Link to="/neworder">
          <button className="orderAddButton">Create</button>
        </Link> */}
      </div>
      <div className="orderTop">
        <div className="orderTopLeft"></div>
        <div className="orderTopRight">
          <div className="orderInfoTop">
            <span className="orderName"></span>
          </div>

          <div className="orderInfoBottom">
            <div style={{ width: "350px" }} className="orderInfoItem">
              <span className="orderInfoKey">Korisnicki ID: </span>
              <span className="orderInfoValue">{order._id}</span>
            </div>
            <div className="orderInfoItem">
              <span className="orderInfoKey">Iznos:</span>
              <span className="orderInfoValue">{order.amount} €</span>
            </div>
            <div
              style={{
                width: "400px",
                display: "flex",
                alignItems: "center",
              }}
              className="orderInfoItem"
            >
              <span className="orderInfoKey">Status Narudzbe:</span>
              <span className="orderInfoValue">
                {order.status === "pending" ? <b>u tijeku</b> : "poslano"}
              </span>
              <select
                onChange={(e) => setOptions(e.target.value)}
                defaultValue="Options"
                className="orderInfoValue"
              >
                <option value="Options" disabled>
                  Odaberi Status
                </option>
                <option value="pending">U tijeku</option>
                <option value="shipped">Poslano</option>
              </select>
              <span
                style={{
                  marginLeft: ".1em",
                  border: "1px solid black",
                  padding: 5,
                  cursor: "pointer",
                }}
                onClick={handleClick}
              >
                Potvrdi
              </span>
            </div>
            <div style={{ width: "700px" }} className="orderInfoItem">
              <span className="orderInfoKey">Adresa:</span>
              <span className="orderInfoValue">
                {JSON.stringify(order.address)}
              </span>
            </div>
            <div className="orderInfoItem">
              <span className="orderInfoKey">Datum:</span>
              <span className="orderInfoValue">
                {new Date(order.createdAt).toLocaleDateString("hr-HR")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="orderBottom">
        <div className="orderTopLeft">
          <span style={{ fontSize: "20px", fontWeight: "600" }}>Proizvodi</span>
        </div>
        <div className="orderTopRight">
          {order.products?.map((item, i) => (
            <div key={i}>
              <div className="orderInfoTop">
                <img src={item.img} alt="" className="productInfoImg" />
                <span className="productName">{item.title}</span>
              </div>

              <div
                style={{
                  marginBottom: "3em",
                  padding: "20px",
                  border: "1px solid #d4d4d4",
                }}
                className="orderInfoBottom"
              >
                <div className="orderInfoItem">
                  <span className="orderInfoKey">ID: </span>
                  <span className="orderInfoValue">{item._id}</span>
                </div>
                <div className="orderInfoItem">
                  <span className="orderInfoKey">Cijena Artikla:</span>
                  <span className="orderInfoValue">{item.price} €</span>
                </div>
                <div className="orderInfoItem">
                  <span className="orderInfoKey">Kolicina:</span>
                  <span className="orderInfoValue">{item.quantity}</span>
                </div>
                <div className="orderInfoItem">
                  <span className="orderInfoKey">Velicina:</span>
                  <span className="orderInfoValue">{item.size}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
