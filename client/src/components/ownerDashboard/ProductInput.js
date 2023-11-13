import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  useAddProductMutation,
  useGetProductsQuery,
} from '../../slices/productApiSlice';

function ProductInput() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    owner: '',
    price: '',
  });

  const [addProduct] = useAddProductMutation();
  const { refetch } = useGetProductsQuery();
  const userInfo = useSelector((state) => state.auth.userInfo.id);
  const user = useSelector((state) => state.auth.userInfo);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const address = `${user.street}, ${user.city}, ${user.state}, ${user.country}`;

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=AIzaSyAIGULR3p6qn-h-AStpV91ZSN-w-WlV98w`
      );

      if (!response.ok) {
        throw new Error('Network error');
      }

      const data = await response.json();

      if (!(data.results && data.results.length > 0)) {
        throw new Error('No results found');
      }
      
      const { lat, lng } = data.results[0].geometry.location;

      const res = await addProduct({
        ...formData,
        owner: userInfo,
        latitude: lat,
        longitude: lng,
      }).unwrap();
      if (res) {
        refetch();
        navigate('/owner');
      }
    } catch (error) {
      toast.error(error?.data?.error || error);
    }
  };

  return (
    <div className='container mx-auto mt-8'>
      <h2 className='text-2xl font-bold mb-4'>Add a New Product</h2>
      <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
        <div className='mb-4'>
          <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>
            Product Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            className='w-full border rounded py-2 px-3'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='description'
            className='block text-gray-700 font-bold mb-2'
          >
            Description
          </label>
          <textarea
            id='description'
            name='description'
            value={formData.description}
            onChange={handleInputChange}
            className='w-full border rounded py-2 px-3'
            required
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='price' className='block text-gray-700 font-bold mb-2'>
            Price
          </label>
          <input
            type='number'
            id='price'
            name='price'
            value={formData.price}
            onChange={handleInputChange}
            className='w-full border rounded py-2 px-3'
            required
          />
        </div>

        <button
          type='submit'
          className='bg-blue-500 text-white font-bold py-2 px-4 rounded'
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ProductInput;
