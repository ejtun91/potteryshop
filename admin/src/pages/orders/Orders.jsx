import "./orders.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../../requestMethods";

export default function Orders() {
  const dispatch = useDispatch();
  // const products = useSelector((state) => state.product.products);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const res = await userRequest("/orders");
      setOrders(res.data);
    };
    getOrders();
  }, []);

  console.log(orders);

  const handleDelete = async (id) => {
    try {
      await userRequest.delete(`/orders/${id}`);
      setOrders(orders.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { field: "userId", headerName: "Korisnicki ID", width: 220 },
    {
      field: "amount",
      headerName: "Iznos",
      width: 200,
      renderCell: (params) => {
        return <div className="orderListItem">{"€ " + params.row.amount}</div>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="orderListItem">
            {params.row.status === "pending" ? "u tijeku" : "poslano"}
          </div>
        );
      },
    },
    {
      field: "products",
      headerName: "Proizvodi",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="orderListItem">{params.row.products.length}</div>
        );
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/order/" + params.row._id}>
              <button className="userListEdit">Detalji</button>
            </Link>
            <DeleteOutline
              className="orderListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="orderList">
      <DataGrid
        rows={orders.reverse()}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
