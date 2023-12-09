import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button} from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import Message from '../common/Message';
import Loader from '../common/Loader';
import { useGetProductsQuery } from '../../slices/productApiSlice';
import React ,{useEffect} from 'react';

const Products = () => {
  const { data: products, refetch, isLoading, error } = useGetProductsQuery();
  console.log('Products:', products);
  useEffect(() => {
    refetch();
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              {/* <th>OWNER NAME</th>
              <th>OWNER EMAIL</th> */}
              <th>PRICE</th>
              <th>STOCK</th>
              <th>DESCRIPTION</th>
              <th>STATUS</th>
              <th>EDIT</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products.products)?(
              products.products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                {/* <td>{product.ownerDetails?.username}</td>
                <td>{product.ownerDetails?.email}</td> */}
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>{product.description}</td>
                <td>
                    {product.isApproved ? 'Approved' : 'Pending'}
                  </td> 
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm mx-2'>
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                  >
                    <FaTrash style={{ color: 'black' }} />
                  </Button>
                </td>
              </tr>
            ))):null}
          </tbody>
        </Table>

      )}
        <footer className='fixed bottom-0 py-4 text-center text-gray-300'>
          &copy; {new Date().getFullYear()} BotBazaar. All rights reserved.
        </footer>
      </>
  );
};

export default Products;
