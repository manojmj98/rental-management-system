import React, { useState, useEffect } from 'react';
import NavBar from '../common/NavBar';
import Card from '../common/Card';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../slices/productApiSlice';
import { FaSearch } from 'react-icons/fa';

function RenterDashboard() {
  const [robots, setRobots] = useState(null);
  const [search, setSearch] = useState('');
  const param = useParams();

  const { data } = useGetProductsQuery({ keyword: param.search });

  const navigate = useNavigate();

  const searchHandler = () => {
    navigate(`/renter/${search}`);
  };

  useEffect(() => {
    if (data) {
      setRobots(data.products);
    }
  }, [data]);

  return (
    <div className='bg-white h-screen flex flex-col'>
      {/* Navbar */}
      <NavBar className='bg-white' />

      {/* Robot Listing Section */}
      <section className='container mx-auto flex flex-col items-center mt-8'>
        <h3 className='text-3xl font-semibold text-black mb-6'>
          Available Robots for Rent
        </h3>
        <div className='mb-6'>
          <input
            placeholder='Search for robots...'
            className='px-4 py-2 h-full border rounded-l-lg focus:ring-blue-500 focus:border-blue-500 text-black float-left w-4/5'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* Call to Action */}
          <button
            className='bg-blue-500 h-full hover:bg-blue-700 text-white py-3 px-4 rounded-r-lg justify-items-center float-left w-min'
            onClick={searchHandler}
          >
            <FaSearch/>
          </button>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {robots &&
            robots.map((robot) => (
              <Link to={`../renter/product/${robot._id}`}>
                <Card
                  key={robot._id}
                  title={robot.name}
                  description={robot.description}
                  price={robot.price}
                />
              </Link>
            ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className='py-4 text-center text-gray-700'>
        &copy; {new Date().getFullYear()} BotBazaar. All rights reserved.
      </footer>
    </div>
  );
}

export default RenterDashboard;
