import React from "react";

const Productpage = () => {
  const product = {
    name: "Example Product",
    description: "This is an example product description.",
    price: 29.99,
    imageUrl: "https://via.placeholder.com/300", 
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
      <img
        src={product.imageUrl}
        alt={product.name}
        className="mb-4 rounded-lg"
      />
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-2xl font-bold text-green-600">${product.price}</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
        update
      </button>
    </div>
  );
};

export default Productpage;
