import React, { useState, useEffect } from "react";

import "./MyOrders.scss";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Loading from "../../Loading/Loading";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { BsSearch } from "react-icons/bs";

import { userInfo } from "../../../utils/getLocalStorage";

const MyOrders = () => {
  const [orders, setOrders] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      async function getMyOrders() {
        const { data } = await axios.get("/api/orders/myorders/", config);
        setOrders(data);
      }
      getMyOrders();
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!orders) {
    return <Loading />;
  }

  return (
    <div className="profile__orders">
      <div className="profile__orders-items">
        <h1>My Orders</h1>
        {orders.length === 0 ? (
          <p>You have no orders.</p>
        ) : (
          <TableContainer sx={{ maxHeight: 440, width: "80%" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">DATE</TableCell>
                  <TableCell align="center">TOTAL</TableCell>
                  <TableCell align="center">PAID</TableCell>
                  <TableCell align="center">DELIVERED</TableCell>
                  <TableCell align="center">DETAILS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell align="center">{order._id}</TableCell>
                    <TableCell align="center">
                      {order.createdAt.slice(0, 10)}
                    </TableCell>
                    <TableCell align="center">${order.totalPrice}</TableCell>
                    <TableCell align="center">
                      {order.isPaid ? "Paid" : "Pending payment"}
                    </TableCell>
                    <TableCell align="center">
                      {order.isDelivered ? "Delivered" : "Pending delivery"}
                    </TableCell>
                    <TableCell align="center">
                      <BsSearch
                        onClick={() => navigate(`/orders/${order._id}`)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
