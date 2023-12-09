import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Modal } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import Message from "../common/Message";
import Loader from "../common/Loader";
import { useGetOrdersQuery, useProcessRefundMutation } from "../../slices/ordersApiSlice";
import {Link} from 'react-router-dom';
import NavBar from "../common/NavBar";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Orders = () => {
  const { data:orders,refetch, isLoading, error } = useGetOrdersQuery();
  const [processRefund] = useProcessRefundMutation();
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  console.log("Orders:",orders);

  const handleRefundClick = async (orderId) => {
    setSelectedOrderId(orderId);
    //setShowRefundPopup(true);
    if (window.confirm("Are you sure?")) {
      try {
        await processRefund(orderId);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
    else{
      // The user canceled the refund operation, so there's no need to perform any action.
      setSelectedOrderId(null);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USERID</th>
              <th>USEREMAIL</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
          {Array.isArray(orders.orders) ? (
            orders.orders.map((order) => (
              <tr key={order?._id}>
                <td>{order?._id}</td>
                <td>{order.user._id}</td>
                <td>{order.user.email}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.status ? (
                    order.status
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                    {order.isRefundIssued ? (
                      'Refund Issued'
                    ) : (
                      <Button
                        variant="primary"
                        onClick={() => handleRefundClick(order._id)}
                        disabled={order.isRefundIssued}
                        style={{ color: "black" }}
                      >
                        {order.isRefundIssued ? 'Refund Issued' : 'Refund'}
                      </Button>
                    )}
                  </td>
              </tr>
            ))): null}
          </tbody>
        </Table>
      )}
      <footer className="py-4 text-center fixed bottom-0 text-gray-300">
        &copy; {new Date().getFullYear()} BotBazaar. All rights reserved.
      </footer>
    </>
  );
};

export default Orders;
