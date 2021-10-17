import "./cart.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../../requestMethods";

export default function Cart() {
  const dispatch = useDispatch();
  // const products = useSelector((state) => state.product.products);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const res = await userRequest.get("/cart");
      setOrders(res.data);
    };
    getOrders();
  }, []);

  console.log(orders);

  //   const handleDelete = async (id) => {
  //     try {
  //       await userRequest.delete(`/orders/${id}`);
  //       setOrders(orders.filter((item) => item._id !== id));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const columns = [
    { field: "_id", headerName: "Korisnicki ID", width: 220 },
    {
      field: "amount",
      headerName: "Iznos",
      width: 200,
      renderCell: (params) => {
        return <div className="cartListItem">{"€ " + params.row.amount}</div>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cartListItem">
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
        return <div className="cartListItem">{params.row.products.length}</div>;
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
              <button className="userListEdit">Uvid</button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="cartList">
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
