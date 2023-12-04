import { useGetTotalOrdersQuery } from '../../slices/ordersApiSlice';
import { useGetUsersCountQuery } from '../../slices/userApiSlice';
import { useGetProductsCountQuery } from '../../slices/productApiSlice';
import Card from 'react-bootstrap/Card';
import { BiSolidShoppingBags } from 'react-icons/bi';
import { PiRobot } from 'react-icons/pi';
import { FiUsers } from 'react-icons/fi';

const Dashboard = () => {
  const {data: ordersCount} = useGetTotalOrdersQuery();
  const {data: usersCount} = useGetUsersCountQuery();
  const {data: productsCount} = useGetProductsCountQuery();
  return (
    <>
      <section className='container mx-auto flex flex-col items-center mt-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          <Card style={{ width: '40rem' }} >
            <Card.Body>
              <BiSolidShoppingBags className='mr-10'/> 
              <Card.Header className='text-gray-900 font-semibold text-xl mb-2'>Total Orders</Card.Header>
              <Card.Text>{ordersCount}</Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: '40rem' }}>
            <Card.Body>
              <PiRobot className='mr-10'/>
              <Card.Header className='text-gray-900 font-semibold text-xl mb-2'>Total Products</Card.Header>
              <Card.Text>{productsCount}</Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: '40rem' }}>
            <Card.Body>
                <FiUsers/>
              <Card.Header className='text-gray-900 font-semibold text-xl mb-2'>Total Users</Card.Header>
              <Card.Text>{usersCount}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </section>

      <footer className='py-4 text-center fixed bottom-0 text-gray-300'>
        &copy; {new Date().getFullYear()} BotBazaar. All rights reserved.
      </footer>
    </>
  );
};

export default Dashboard;
