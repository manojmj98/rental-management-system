import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useDeleteProductByIdMutation,
  useGetProductByIdQuery,
  useGetProductsQuery,
  useUpdateProductMutation,
} from '../../slices/productApiSlice';

const ProductPage = () => {
  let { id } = useParams();
  const { data } = useGetProductByIdQuery({ id });
  const [robot, setRobot] = useState(null);
  const [updateProduct, setUpdateProduct] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState('');
  const [url,setUrl] = useState('');

  React.useEffect(() => {
    if (data) {
      setRobot(data);
      setName(data.name);
      setDescription(data.description);
      setPrice(data.price);
      setTags(data.tags);
      const currentUrl = window.location.href; 
      const imageUrl = `${currentUrl}/../../${data.image}`; 
      setUrl(imageUrl) 
    }
  }, [data]);

  const [update] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductByIdMutation();
  const { refetch } = useGetProductsQuery();
  const navigate = useNavigate();
  
  const handleDeleteProduct = async () => {
    try {
      const response = await deleteProduct({ id: id }).unwrap();
      if (response) {
        refetch();
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
        tags: tags,
        id: id,
      }).unwrap();

      if (response) {
        refetch();
        navigate('/owner');
      }
    } catch (error) {
      toast.error('Please try again later');
    }
  };

  return (
    robot && (
      <div className="container mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8">
        <div className="w-full md:w-1/2 flex justify-center items-center">
  <img
    src={url}
    alt={robot.name}
    className="mb-4 rounded-lg"
    style={{ width: '400px', height: '400px' }}
  />
</div>

          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">{robot.name}</h2>
            <p className="text-gray-700 mb-4">{robot.description}</p>
            <p className="text-2xl font-bold text-green-600 mb-4">${robot.price}</p>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setUpdateProduct(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Update
              </button>
              <button
                onClick={handleDeleteProduct}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        {updateProduct && (
          <div>
            <form className='max-w-md mx-auto' onSubmit={handleUpdateProduct}>
              <div className='mb-4'>
                <label
                  htmlFor='name'
                  className='block text-gray-700 text-sm font-bold mb-2'
                >
                  Name:
                </label>
                <input
                  type='text'
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='description'
                  className='block text-gray-700 text-sm font-bold mb-2'
                >
                  Description:
                </label>
                <textarea
                  id='description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
              </div>
              <div className='mb-6'>
                <label
                  htmlFor='price'
                  className='block text-gray-700 text-sm font-bold mb-2'
                >
                  Price:
                </label>
                <input
                  type='number'
                  id='price'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='tags'
                  className='block text-gray-700 font-bold mb-2'
                >
                  Tags (Comma Separated)
                </label>
                <input
                  type='text'
                  id='tags'
                  name='tags'
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className='w-full border rounded py-2 px-3'
                />
              </div>
              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              >
                Update Product
              </button>
            </form>
          </div>
        )}
      </div>
    )
  );
};

export default ProductPage;
