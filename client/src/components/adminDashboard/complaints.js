import React, { useState, useRef, useEffect } from 'react';
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
import { Dropdown } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Complaints = () => {
  const {
    data: complaints,
    refetch,
    isLoading,
    error,
  } = useGetComplaintsQuery();
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [statusToUpdate, setStatusToUpdate] = useState(null);
  const [assignToOwner, setAssignToOwner] = useState(false);

  const updateStatusMutation = useUpdateStatusMutation();
  // const assignToOwnerMutation = useAssignToOwnerMutation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSelectedComplaint(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleStatusUpdate = async () => {
    try {
      const response = await updateStatusMutation.mutateAsync({
        id: selectedComplaint._id,
        status: statusToUpdate,
      });

      if (response) {
        refetch();
        toast.success('Complaint status updated successfully!');
      }
    } catch (error) {
      console.error('Error updating complaint status:', error);
      toast.error('Failed to update complaint status. Please try again.');
    } finally {
      setSelectedComplaint(null);
      setStatusToUpdate(null);
    }
  };

  console.log('Complaints:', complaints);
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
              {/* <th>UserId</th> */}
              <th>UserEmail</th>
              <th>OrderId</th>        
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.complaints &&
              complaints.complaints.map((complaint) => (
                <tr key={complaint._id}>
                  <td>{complaint._id}</td>
                  <td>{complaint.description}</td>
                  {/* <td>{complaint.customer._id}</td> */}
                  <td>
                    <a href={`mailto:${complaint.customer.email}`}>
                      {complaint.customer.email}
                    </a>
                  </td>
                  <td>{complaint.orderId}</td>
                  <td>{complaint.complaintStatus}</td>
                  <td>
                  <LinkContainer to={`/admin/complaint/${complaint._id}/edit`}>
                    <Button variant='light' className='btn-sm mx-2'>
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    // onClick={() => deleteHandler(product._id)}
                  >
                    <FaTrash style={{ color: 'black' }} />
                  </Button>
                  </td>
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
