import React, { useState } from "react";
import { Table } from "react-bootstrap";
import Message from "../common/Message";
import Loader from "../common/Loader";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../slices/userApiSlice";
import { toast } from "react-toastify";

const Users = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteDropdownOpen, setDeleteDropdownOpen] = useState(false);
  const handleDropDown =(user)=>{
    if (isDeleteDropdownOpen)
    {
      setSelectedUser(null);
      setDeleteDropdownOpen(false);
    }
    else
      {
        setSelectedUser(user);
        setDeleteDropdownOpen(true);
      }
      
  }

  const handleDelete = async (user,id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
    else{
      // The user canceled the delete operation, so there's no need to perform any action.
      setSelectedUser(null);
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
              <th>Id</th>
              <th>UserName</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.role}
                </td>
                <td>
              <div className="action-dropdown">
                <button
                  onClick={() => {
                    handleDropDown(user)}
                  }
                  className="action-button"
                >
                  ...
                </button>
                {isDeleteDropdownOpen &&selectedUser === user && (
                  <div className="dropdown-menu">
                    <button onClick={() => handleDelete(user,user._id)}>Delete</button>
                  </div>
                )}
              </div>
            </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <footer className="fixed bottom-0 py-4 text-center text-gray-300">
        &copy; {new Date().getFullYear()} BotBazaar. All rights reserved.
      </footer>
    </>
  );
};

export default Users;
