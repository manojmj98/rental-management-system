import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetComplaintByIdQuery,useUpdateStatusMutation } from '../../slices/complaintApiSlice';
import NavBar from "../../components/common/NavBar";

const EditComplaint = () => {
    const { id } = useParams();
    const { data: complaintData, refetch, isLoading, error} = useGetComplaintByIdQuery({ id });
    const [complaint, setComplaint] = useState({});
    const [approvalStatus, setApprovalStatus] = useState('approved');
    const [previousComments, setPreviousComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [update] = useUpdateStatusMutation();
    const navigate = useNavigate();
    useEffect(() => {
      if (complaintData) {
        setComplaint(complaintData);
        setPreviousComments(complaintData.comments);
      }
    }, [complaintData]);
    const handleStatusChange = (event) => {
      setApprovalStatus(event.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newComment.trim() !== '') {
          const updatedComments = [
            ...previousComments,
            {
              date: new Date().toLocaleString(),
              commenter: 'ADMIN', // Assuming the commenter is an admin for new comments
              comment: newComment,
            },
          ];
      
          try {
            console.log("status inside handle submit:", complaintData.complaintStatus);
            const response = await update({
              complaintStatus: approvalStatus,
              id: complaintData._id,
              comments: updatedComments // Update with the new comments
            }).unwrap();
      
            if (response) {
              // Update the state after a successful update
              const newComplaintData = {
                ...complaintData,
                comments: updatedComments, // Update with the new comments
              };
              setComplaint(newComplaintData);
              setPreviousComments(updatedComments);
              setNewComment('');
              refetch();
              navigate('/admin');
            }
          } catch (error) {
            console.log(error);
            toast.error('Please try again later');
          }
        }
      };

    return (
        <>
          <NavBar />
          <div className='container mx-auto mt-8'>
            <h2 className='text-2xl font-bold mb-4'>Complaint Details</h2>
            <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
              <div className='mb-4'>
                <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>
                  Complaint Id: <span>{complaint._id}</span>
                </label>
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='description'
                  className='block text-gray-700 font-bold mb-2'
                >
                  Description: <span>{complaint.description}</span>
                </label>
              </div>
              <div className='mb-4'>
                <label htmlFor='price' className='block text-gray-700 font-bold mb-2'>
                  Order Id: <span>{complaint.orderId}</span>
                </label>
              </div>
              <div className='mb-4'>
                <label htmlFor='price' className='block text-gray-700 font-bold mb-2'>
                  Customer Id: <span>{complaint.customer}</span>
                </label>
              </div>
              <div className='mb-4'>
                <label htmlFor='price' className='block text-gray-700 font-bold mb-2'>
                  Created At: <span>{new Date(complaint.createdAt).toLocaleString()}</span>
                </label>
              </div>
              <div className='mb-4'>
                <table className='border-collapse border border-gray-400 w-full'>
                  <thead>
                    <tr>
                      <th className='border border-gray-400'>Date</th>
                      <th className='border border-gray-400'>Commenter</th>
                      <th className='border border-gray-400'>Comment</th>
                    </tr>
                  </thead>
                  <tbody>
                  {complaint.comments && complaint.comments.length > 0
                    ?[...complaint.comments] 
                      .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort comments by date
                      .map((comment, index) => (
                        <tr key={index}>
                          <td className='border border-gray-400'>
                          {new Date(comment.date).toLocaleString()}</td>
                          <td className='border border-gray-400'>{comment.commenter}</td>
                          <td className='border border-gray-400'>{comment.comment}</td>
                        </tr>
                      )): <tr>
                      <td className='border border-gray-400' colSpan='3'>No comments available.</td>
                    </tr>
                }
                  </tbody>
                </table>
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                  Comments:
                  <span className='text-xs text-gray-500 pl-2'>(Max 200 chars)</span>
                </label>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows='4'
                  maxLength='200'
                  className='border border-gray-400 w-full p-2'
                ></textarea>
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                  Approval Status:
                </label>
                <label>
                  <input
                    type='radio'
                    value='approved'
                    checked={approvalStatus === 'approved'}
                    onChange={handleStatusChange}
                  />
                  Approve
                </label>
                <label>
                  <input
                    type='radio'
                    value='denied'
                    checked={approvalStatus === 'denied'}
                    onChange={handleStatusChange}
                  />
                  Deny
                </label>
                <label>
                  <input
                    type='radio'
                    value='assginedToOwner'
                    checked={approvalStatus === 'assginedToOwner'}
                    onChange={handleStatusChange}
                  />
                  Assgin to Owner
                </label>
              </div>
              <button
                type='submit'
                onClick={handleSubmit}
                className='bg-blue-500 text-white font-bold py-2 px-4 rounded'
              >
                Submit
              </button>
            </form>
          </div>
        </>
      )

}

export default EditComplaint;