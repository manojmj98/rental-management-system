import React, { useState } from 'react';
import { useCreateComplaintMutation,useGetComplaintsQuery } from '../../slices/complaintApiSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const CreateComplaint = () => {
  const [complaintData, setComplaintData] = useState({
    subject: '',
    description: '',
    contactMethod: 'email', // You can initialize with a default value
    contactInfo: '',
    orderId: ''
  });
const navigate = useNavigate();
const { refetch } = useGetComplaintsQuery();
const [createComplaint] = useCreateComplaintMutation();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setComplaintData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can perform any actions here, such as sending the complaint data to the server
    console.log('Complaint Submitted:', complaintData);
    try{
      const result = await createComplaint({
        ...complaintData
      }).unwrap();
      if(result) {
        refetch();
        navigate('/renter/dashboard');
      }
    }
    catch(error){
        toast.error(error?.data?.error || error);
    }
    // Reset the form after submission
    setComplaintData({
      subject: '',
      description: '',
      contactMethod: 'email',
      contactInfo: '',
      orderId: ''
    });
  };

  return (
    <div className='w-80'>
      <h2 className='text-2xl font-bold mb-4'>Create Complaint</h2>
      <form onSubmit={handleSubmit}>
      <div className='mb-4'>
          <label htmlFor='subject' className='block text-sm font-medium text-gray-700'>
            Order Id
          </label>
          <input
            type='text'
            id='orderId'
            name='orderId'
            value={complaintData.orderId}
            onChange={handleInputChange}
            required
            className='mt-1 p-2 w-full border rounded-md'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='subject' className='block text-sm font-medium text-gray-700'>
            Subject
          </label>
          <input
            type='text'
            id='subject'
            name='subject'
            value={complaintData.subject}
            onChange={handleInputChange}
            required
            className='mt-1 p-2 w-full border rounded-md'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
            Description
          </label>
          <textarea
            id='description'
            name='description'
            value={complaintData.description}
            onChange={handleInputChange}
            required
            rows='4'
            className='mt-1 p-2 w-full border rounded-md'
          ></textarea>
        </div>
        <div className='mb-4'>
          <label htmlFor='contactMethod' className='block text-sm font-medium text-gray-700'>
           Preferred Contact Method
          </label>
          <select
            id='contactMethod'
            name='contactMethod'
            value={complaintData.contactMethod}
            onChange={handleInputChange}
            className='mt-1 p-2 w-full border rounded-md'
          >
            <option value='email'>Email</option>
            <option value='phone'>Phone</option>
          </select>
        </div>
        <div className='mb-4'>
          <label htmlFor='contactInfo' className='block text-sm font-medium text-gray-700'>
            Contact Information
          </label>
          <input
            type='text'
            id='contactInfo'
            name='contactInfo'
            value={complaintData.contactInfo}
            onChange={handleInputChange}
            required
            className='mt-1 p-2 w-full border rounded-md'
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700'
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default CreateComplaint;
