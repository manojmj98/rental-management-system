import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {useGetProductByIdQuery} from '../../slices/productApiSlice';
import NavBar from "../../components/common/NavBar";
const EditProduct = () => {
    const { id } = useParams();
    console.log("id: ",id);
    const { data: productData, refetch, isLoading, error} = useGetProductByIdQuery(id); // Pass the product ID to the query
    console.log("Product: ",productData);
    const [product, setProduct] = useState({});
    const [comments, setComments] = useState('');
    const [approvalStatus, setApprovalStatus] = useState('approved');
    const [previousComments, setPreviousComments] = useState([]);

  // Fetch product details using an API call or any other method.
  useEffect(() => {
    if (productData) {
      setProduct(productData);
    }
  }, [productData]);

  const handleStatusChange = (event) => {
    setApprovalStatus(event.target.value);
  };

  const handleApprove = () => {
    // Implement the logic to update the product status to "approved" in the database.
    //setIsApproved(true);
  };

  const handleDeny = () => {
    // Implement the logic to update the product status to "denied" in the database.
    //setIsApproved(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    //   const res = await addProduct({ ...formData }).unwrap();
    //   if (res) {
    //     refetch()
    //     navigate('/owner');
    //   }
    } catch (error) {
      toast.error(error?.data?.error || error);
    }
  };

  return (
  <>
  <NavBar />
    <div className='container mx-auto mt-8'>
      <h2 className='text-2xl font-bold mb-4'>Product Details</h2>
      <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
        <div className='mb-4'>
          <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>
            Product Name:
          </label>
          <span>{product.name}</span>
        </div>
        <div className='mb-4'>
          <label
            htmlFor='description'
            className='block text-gray-700 font-bold mb-2'
          >
            Description:
          </label>
          <span>{product.description}</span>
        </div>

        <div className='mb-4'>
          <label htmlFor='price' className='block text-gray-700 font-bold mb-2'>
            Price:
          </label>
          <span>{product.price}</span>
        </div>
        <div className='mb-4'>
          <label htmlFor='price' className='block text-gray-700 font-bold mb-2'>
            Stock:
          </label>
          <span>{product.stock}</span>
        </div>
        <div className='mb-4'>
          <label htmlFor='price' className='block text-gray-700 font-bold mb-2'>
            Availability:
          </label>
          <span>{product.availability}</span>
        </div>
        <button
          type='submit'
          className='bg-blue-500 text-white font-bold py-2 px-4 rounded'
        >
          Submit
        </button>
      </form>
    </div>
  </>
    
    
  );
};

export default EditProduct;
