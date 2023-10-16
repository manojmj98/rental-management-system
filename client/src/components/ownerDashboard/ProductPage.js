import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDeleteProductByIdMutation, useGetProductByIdQuery } from '../../slices/productApiSlice';

const ProductPage = () => {
  let { id } = useParams();
  const { data, isLoading, error } = useGetProductByIdQuery({id});
  const [robot, setRobot] = useState(null);
  

  React.useEffect(() => {
    if (data) {
      setRobot(data);
    }
  }, [data]);

  const [deleteProduct] = useDeleteProductByIdMutation();
  const navigate = useNavigate();
  
  const handleDeleteProduct = async () => {
    try {
      const response = await deleteProduct({ id: id }).unwrap();
      if (response) {
        navigate('/owner');
      }
    } catch (error) {
      toast.error('Please try again later');
    }
  };
  return (
    robot && (
      <div className='container mx-auto mt-8'>
        <h2 className='text-2xl font-bold mb-4'>{robot.name}</h2>
        <img
          src='https://picsum.photos/200/300'
          alt={robot.name}
          className='mb-4 rounded-lg'
        />
        <p className='text-gray-700 mb-4'>{robot.description}</p>
        <p className='text-2xl font-bold text-green-600'>${robot.price}</p>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4'>
          update
        </button>
        <button
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-4'
          onClick={handleDeleteProduct}
        >
          delete
        </button>
      </div>
    )
  );
};

export default ProductPage;
