import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetProductByIdQuery } from '../../slices/productApiSlice';
import NavBar from '../common/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../slices/cartSlice';

const RenterItemPage = () => {
  const [qty, setQty] = useState(1);

  const { id } = useParams();

  const { data: robot } = useGetProductByIdQuery({ id });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    if (!userInfo) {
      return navigate('/login');
    }
    dispatch(addToCart({ qty, ...robot }));
  };

  return (
    <>
      <NavBar />
      {robot && (
        <div className='container mx-auto mt-8 flex flex-col items-center'>
          <h2 className='text-2xl font-bold mb-4'>{robot.name}</h2>
          <img
            src='https://picsum.photos/200/300'
            alt={robot.name}
            className='mb-4 rounded-lg'
          />
          <p className='text-gray-700 mb-4'>{robot.description}</p>
          <p className='text-2xl font-bold text-green-600'>${robot.price}</p>
          <input
            type='number'
            className='mt-1 px-4 py-2  border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white'
            placeholder='Answer'
            value={qty}
            onChange={(ev) => {
              const input = Number(ev.target.value);
              if (input > 0) setQty(input);
            }}
          />
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4'
            onClick={addToCartHandler}
          >
            Add to Cart
          </button>
        </div>
      )}
    </>
  );
};

export default RenterItemPage;
