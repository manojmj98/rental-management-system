import React from 'react';

function Card(props) {
  const cardStyles = {
    border: props.isApproved ? 'none' : '1px solid #e53935', 
    backgroundColor: '#ffffff',
  };
  const currentUrl = window.location.href; 
  const imageUrl = `${currentUrl}/../${props.imagePath}`;   
  console.log(currentUrl)

  return (
    <div className='bg-white rounded-lg shadow-md p-6 transition duration-300 transform hover:scale-105' style={cardStyles}>
      <img
        src={imageUrl}
        alt='Sunset in the mountains'
        className='w-48 h-48 mx-auto mb-4 rounded-full'
      />
      <p className='text-gray-900 font-semibold text-xl mb-2'>{props.title}</p>
      <p className='text-gray-700 mb-4'>{props.description}</p>
      <p className='text-green-600 font-semibold text-lg'>
        ${props.price} / hr
      </p>
      {props.isApproved ? null : <p className='text-red-600 font-semibold'>Approval Pending</p>}
    </div>
  );
}

export default Card;
