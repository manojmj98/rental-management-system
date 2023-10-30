import React, { useState, useEffect } from 'react';

function BookingsPage() {
  const [bookedProducts, setBookedProducts] = useState([
    {
      id: 1,
      title: 'Booked Product 1',
      description: 'Description for Booked Product 1',
    },
    {
      id: 2,
      title: 'Booked Product 2',
      description: 'Description for Booked Product 2',
    },
    {
      id: 3,
      title: 'Booked Product 3',
      description: 'Description for Booked Product 3',
    },
  ]);

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Booked Products</h1>
      <ul className="space-y-4">
        {bookedProducts.map((product) => (
          <li key={product.id} className="border p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-2">{product.title}</h3>
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookingsPage;
