import React, { useState } from 'react';
import logo from '../../logo.svg';
import Card from '../common/Card';
import NavBar from '../common/NavBar';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../../slices/productApiSlice';
import ProfileSection from '../ProfileSection';
import BookingsPage from './bookingsPage';
import Complaints from './complaints';
function OwnerDashBoard(props) {
  const [robots, setRobots] = useState(null);

  const { data } = useGetProductsQuery();
  const [selectedTab, setSelectedTab] = useState('myAds');

  React.useEffect(() => {
    if (data) {
      setRobots(data.products);
    }
  }, [data]);
  var filteredRobots = null;
  const userInfo = useSelector((state) => state.auth.userInfo?.id);
  const authenticated = useSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();
  if (!authenticated) {
    navigate('/');
    return null;
  }
  if (robots) {
    filteredRobots = robots.filter((robot) => robot.owner === userInfo);
  }
  return (
    <>
      <NavBar />
      <div className='grid grid-cols-5 bg-white '>
        <div className='flex flex-col items-center h-screen pt-3/12 col-span-1 w-100'>
          <img src={logo} alt='Logo'></img>
          <button
            className='bg-white text-gray-900 hover:bg-blue-700 w-full py-2 px-4 rounded'
            onClick={() => setSelectedTab('myAds')}
          >
            My Ads
          </button>

          <button
            className='bg-white text-gray-900 hover:bg-blue-700 w-full py-2 px-4 rounded'
            onClick={() => setSelectedTab('myBookings')}
          >
            My Bookings
          </button>
          <button className='bg-white text-gray-900 hover:bg-blue-700 w-full py-2 px-4 rounded'>
            Transactions
          </button>
          <button className='bg-white text-gray-900 hover:bg-blue-700 w-full py-2 px-4 rounded'>
            Reports
          </button>
          <button
            className='bg-white text-gray-900 hover:bg-blue-700 w-full py-2 px-4 rounded'
            onClick={() => setSelectedTab('complaints')}
          >
            Complaints
          </button>
          <button
            className='bg-white text-gray-900 hover:bg-blue-700 w-full py-2 px-4 rounded'
            onClick={() => setSelectedTab('settings')}
          >
            Settings
          </button>
        </div>
        {selectedTab === 'myAds' && (
        <section className='md:container md:mx-auto flex flex-col items-center mt-4 col-span-4 w-80'>
          <div className='flex items-center space-x-2 pb-4'>
            <FaPlus className='text-green-300 text-2xl' />
            <Link
              to={`/robotInput`}
              className='text-blue-500 font-semibold hover:underline'
            >
              Add a Robot Listing
            </Link>
          </div>
          <div className='grid grid-cols-3 gap-6 w-4/5'>
        {filteredRobots &&
          filteredRobots
            .filter((robot) => robot.isApproved)
            .map((robot) => (
              <Link to={`../productpage/${robot._id}`} key={robot._id}>
                <Card
                  title={robot.name}
                  description={robot.description}
                  price={robot.price}
                  isApproved={robot.isApproved}
                  imagePath={robot.image}
                />
              </Link>
            ))}
      </div>

      <hr className='border-t my-8 w-4/5 border-gray-300' />

      <div className='grid grid-cols-3 gap-6 w-4/5'>
        {filteredRobots && 
          filteredRobots
            .filter((robot) => !robot.isApproved)
            .map((robot) => (
              <Link to={`../productpage/${robot._id}`} key={robot._id}>
                <Card
                  title={robot.name}
                  description={robot.description}
                  price={robot.price}
                  isApproved={robot.isApproved}
                  imagePath={robot.image}
                />
              </Link>
            ))}
      </div>
        </section>
      )}
      {
        selectedTab === 'myBookings' && (
          <div className='col-span-4 pt-5'>
          <BookingsPage />
          </div>
        )
      }
      {
        selectedTab === 'complaints' && (
          <div className='col-span-4 pt-5'>
          <Complaints />
          </div>
        )
      }
      {
        selectedTab === 'settings' && (
          <div className='col-span-4 pt-10'>
          <ProfileSection page={false} />
          </div>)
      }
    </div>
          </>
  );
}

export default OwnerDashBoard;
