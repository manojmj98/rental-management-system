import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDeleteProductByIdMutation, useGetProductByIdQuery } from '../../slices/productApiSlice';

const ProductPage = () => {
  let { id } = useParams();
  const { data, isLoading, error } = useGetProductByIdQuery({id});
  const [robot, setRobot] = useState(null);
  const [updateProduct,setupdateProduct] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  

  React.useEffect(() => {
    if (data) {
      setRobot(data);
    }
  }, [data]);
  const [update] = useUpdateProductMutation()
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
  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await update({
        name: name,
        description: description,
        price: price,
        id: id,
      }).unwrap();

      if (response) {
        console.log(response)
        navigate('/owner');
      }
    } catch (error) {
      toast.error('Please try again later');
    }
  };
 

  return (
    robot && (
      <div className='container mx-auto mt-8'>
        <div className='flex flex-col items-center'>
        <h2 className='text-2xl font-bold mb-4'>{robot.name}</h2>
        <img
          src='https://picsum.photos/200/300'
          alt={robot.name}
          className='mb-4 rounded-lg'
        />
        <p className='text-gray-700 mb-4'>{robot.description}</p>
        <p className='text-2xl font-bold text-green-600'>${robot.price}</p>
        <div>
        <button 
           className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4'
           onClick={() => setupdateProduct(true)}
        >
          update
        </button>
        <button
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-4'
          onClick={handleDeleteProduct}
        >
          delete
        </button>
        </div>
        
        </div>
        {
          updateProduct && (
            <div >
              <form className="max-w-md mx-auto" onSubmit={handleUpdateProduct}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
          Description:
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
          Price:
        </label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Update Product
      </button>
    </form>
            </div>
          )
        }

      </div>
    )
  );
};

export default ProductPage;
