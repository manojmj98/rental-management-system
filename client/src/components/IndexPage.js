import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousal from './common/Carousel';
import NavBar from './common/NavBar';
import { useGetRecommendedQuery } from '../slices/productApiSlice';

function LandingPage() {
  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  const { data, isLoading } = useGetRecommendedQuery();

  const searchHandler = () => {
    navigate(`/renter/page/1/search/${search}`);
  };

  return (
    <div className='bg-black h-screen flex flex-col'>
      {/* Navbar */}
      <NavBar></NavBar>

      {/* Hero Section */}
      <div className='grid grid-col-1 justify-items-center'>
        <section className='w-1/4'>
          <div className='w-fit p-6 bg-gray-900 rounded-lg shadow-md'>
            {/* BotBazaar Title */}
            <div className='mb-4 text-center'>
              <h2 className='text-4xl font-semibold text-white'>
                Welcome to BotBazaar
              </h2>
            </div>
            {/* Description */}
            <p className='text-gray-300 text-lg mb-4'>
              Rent robots for your business or personal projects. Explore our
              wide range of robotic solutions.
            </p>
            {/* Search Bar */}
            <div className='mb-6'>
              <input
                placeholder='Search for robots...'
                className='px-4 py-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {/* Call to Action */}
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full text-center block transition duration-300 ease-in-out transform hover:scale-105'
              onClick={searchHandler}
            >
              Search
            </button>
          </div>
        </section>

        {/* Carousal Section */}
        {isLoading ? (
          <></>
        ) : (
          <section className='mt-8 w-2/5'>
            <Carousal data={data.products} />
          </section>
        )}
      </div>

      {/* Features Section */}
      <section className='bg-gray-800 py-12'>
        <div className='container mx-auto text-center'>
          <h3 className='text-3xl font-semibold text-white mb-6'>
            Why Choose BotBazaar?
          </h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {/* Feature 1 */}
            <div className='p-4 bg-gray-900 rounded-lg shadow-md'>
              {/* Icon */}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='w-24 h-24 mx-auto'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z'
                />
              </svg>
              {/* Feature Title */}
              <h4 className='text-xl font-semibold text-white mb-2'>
                Cutting-Edge Technology
              </h4>
              {/* Feature Description */}
              <p className='text-gray-300'>
                Our robots are equipped with the latest technology to meet your
                needs.
              </p>
            </div>

            {/* Feature 2 */}
            <div className='p-4 bg-gray-900 rounded-lg shadow-md'>
              {/* Icon */}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='w-24 h-24 mx-auto'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z'
                />
              </svg>

              {/* Feature Title */}
              <h4 className='text-xl font-semibold text-white mb-2'>
                Flexible Rental Options
              </h4>
              {/* Feature Description */}
              <p className='text-gray-300'>
                Choose from short-term or long-term rental plans.
              </p>
            </div>

            {/* Feature 3 */}
            <div className='p-4 bg-gray-900 rounded-lg shadow-md'>
              {/* Icon */}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='w-24 h-24 mx-auto'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z'
                />
              </svg>
              {/* Feature Title */}
              <h4 className='text-xl font-semibold text-white mb-2'>
                Expert Support
              </h4>
              {/* Feature Description */}
              <p className='text-gray-300'>
                Our team of experts is here to assist you at every step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className='py-4 text-center text-gray-300'>
        &copy; {new Date().getFullYear()} BotBazaar. All rights reserved.
      </footer>
    </div>
  );
}

export default LandingPage;
