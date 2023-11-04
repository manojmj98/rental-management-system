import React, { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import Message from '../common/Message';
import Loader from '../common/Loader';
import {
  useCreateComplaintMutation,
  useGetComplaintsQuery,
  useUpdateStatusMutation,
} from '../../slices/complaintApiSlice';
import { toast } from 'react-toastify';

const Complaints = () => {
  const { data: complaints, refetch, isLoading, error } = useGetComplaintsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Description</th>
              <th>UserId</th>
              <th>UserEmail</th>
              <th>OrderId</th>
              <th>Comments</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {complaints.complaints && complaints.complaints.map((complaint) => (
              <tr key={complaint._id}>
                <td>{complaint._id}</td>
                <td>{complaint.description}</td>
                <td>{complaint.customer._id}</td>
                <td>
                  <a href={`mailto:${complaint.customer.email}`}>{complaint.customer.email}</a>
                </td>
                <td>{complaint.orderId}</td>
                <td>{complaint.comments}</td>
                <td>{complaint.complaintStatus}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <footer className='fixed bottom-0 py-4 text-center text-gray-300'>
        &copy; {new Date().getFullYear()} BotBazaar. All rights reserved.
      </footer>
    </>
  );
};

export default Complaints;
