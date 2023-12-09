import React, { useState, useEffect, useRef } from 'react';
import NavBar from '../common/NavBar';
import Card from '../common/Card';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../slices/productApiSlice';
import { FaSearch } from 'react-icons/fa';
import FilterBox from '../common/FilterBox';

function RenterDashboard() {
  const { keyword, pageNumber, tags } = useParams();
  const currentUrl = window.location.href; 
  const [robots, setRobots] = useState(null);
  const [search, setSearch] = useState(keyword ? keyword : '');
  const [tagArr, setTagArr] = useState(tags ? tags.split('-') : []);

  const navigate = useNavigate();

  const { data } = useGetProductsQuery({
    keyword,
    pageNumber,
    tags: tags ? tags.replace(/-/g, ',') : tags,
  });

  const searchHandler = () => {
    if (tagArr.length === 0) {
      if (search.length === 0) navigate(`/renter/page/1/`);
      else navigate(`/renter/page/1/search/${search}`);
    } else {
      if (search.length === 0)
        navigate(`/renter/page/1/tags/${tagArr.join('-')}`);
      else navigate(`/renter/page/1/search/${search}`);
    }
  };

  useEffect(() => {
    if (tagArr.length === 0) {
      if (keyword) navigate(`/renter/page/1/search/${keyword}`);
      else navigate(`/renter/page/1/`);
    } else {
      if (keyword)
        navigate(`/renter/page/1/search/${keyword}/tags/${tagArr.join('-')}`);
      else navigate(`/renter/page/1/tags/${tagArr.join('-')}`);
    }
  }, [keyword, navigate, tagArr]);

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
        <div className='mb-6 w-[350px]'>
          <input
            placeholder='Search for robots...'
            className='px-4 py-2 h-full border rounded-l-lg focus:ring-blue-500 focus:border-blue-500 text-black float-left w-4/5'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className='bg-blue-500 h-full hover:bg-blue-700 text-white py-3 px-4 rounded-r-lg justify-items-center float-left w-min'
            onClick={searchHandler}
          >
            <FaSearch />
          </button>
        </div>
        <div className='grid grid-cols-[15%_85%] w-5/6'>
          <div className='grid grid-cols-1 h-min'>
            <FilterBox
              label='Cooking'
              value='cooking'
              tagArr={tagArr}
              setTagArr={setTagArr}
            />
            <FilterBox
              label='Cleaning'
              value='cleaning'
              tagArr={tagArr}
              setTagArr={setTagArr}
            />
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {robots &&
              robots.map((robot) => {
                if (robot.isApproved) {
                  return (<Link to={`../renter/product/${robot._id}`} key={robot._id}>
                    <Card
                      title={robot.name}
                      description={robot.description}
                      price={robot.price}
                      isApproved={robot.isApproved}
                      renterBool = {true}
                      url = {`${currentUrl}../../../`}
                      imagePath = {robot.image}
                    />
                  </Link>)
                }
                return null;
            })}
          </div>
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
