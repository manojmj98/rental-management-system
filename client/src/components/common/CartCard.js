import React from 'react';
import { Link } from 'react-router-dom';

function CartCard(props) {
  const removeHandler = () => {
    props.removeFromCart(props.robot._id);
  };

  return (
    <div className='grid grid-cols-5 gap-6 bg-white rounded-lg shadow-md p-6 transition duration-300 transform hover:scale-105'>
      <Link to={`/renter/${props.robot._id}`}>
        <img
          src='https://picsum.photos/200/300'
          alt='Sunset in the mountains'
          className='w-48 h-48 mx-auto mb-4 rounded-full'
        />
      </Link>

      <Link to={`/renter/${props.robot._id}`}>
        <p className='text-gray-900 font-semibold text-xl mb-2'>
          {props.robot.name}
        </p>
      </Link>
      <p className='text-gray-700 mb-4'>{props.robot.description}</p>
      <p className='text-green-600 font-semibold text-lg'>
        ${props.robot.price} / hr
      </p>
      <div>
        <button
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-4 rounded-lg w-full'
          type='button'
          onClick={removeHandler}
        >
          Remove
        </button>
        <input
          type='number'
          className='mt-1 px-4 py-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white'
          placeholder='qty'
          value={props.robot.qty}
          onChange={(ev) => {
            const qty = Number(ev.target.value);
            if (qty >= 0) props.addToCart(props.robot, qty);
          }}
        />
      </div>
    </div>
  );
}

export default CartCard;
