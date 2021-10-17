import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import "./widgetLg.css";
import { format } from "timeago.js";

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("/orders");
        setOrders(res.data);
      } catch (error) {}
    };
    getOrders();
  }, []);

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Zadnje Transakcije</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Kupac ID</th>
          <th className="widgetLgTh">Datum</th>
          <th className="widgetLgTh">Iznos</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {orders
          .map((order) => (
            <tr className="widgetLgTr" key={order._id}>
              <td className="widgetLgUser">
                <span className="widgetLgName">{order.userId}</span>
              </td>
              <td className="widgetLgDate">{format(order.createdAt)}</td>
              <td className="widgetLgAmount">{order.amount} €</td>
              <td className="widgetLgStatus">
                <Button
                  type={order.status === "pending" ? "u_tijeku" : "poslano"}
                />
              </td>
            </tr>
          ))
          .reverse()
          .slice(0, 5)}
      </table>
    </div>
  );
}
