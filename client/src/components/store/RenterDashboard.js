import React, { useState, useEffect } from 'react';
import NavBar from '../common/NavBar';
import Card from '../common/Card';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../../slices/productApiSlice';

function RenterDashboard() {
  const [robots, setRobots] = useState(null);
  const { data} = useGetProductsQuery();


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
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {robots &&
            robots.map((robot) => (
              <Link to={`../renter/${robot._id}`}>
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
