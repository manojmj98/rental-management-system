import '../App.css';
import NavBar from './common/NavBar';
import logo from '../logo.svg';
import React, { useState } from 'react';
import Complaints from './renter/complaints';
import CreateComplaint from './renter/createComplaint';
function RenterPage() {
  const [selectedTab, setSelectedTab] = useState('Dashboard');
  return (
    <>
      <NavBar />
      <div className='grid grid-cols-5 bg-white '>
        <div className='flex flex-col items-center h-screen pt-3/12 col-span-1 w-100'>
          <img src={logo} alt='logo'></img>
          <button
            className='bg-white text-gray-900 hover:bg-blue-700 w-full py-2 px-4 rounded'
            onClick={() => setSelectedTab('Complaints')}
          >
            Complaints
          </button>

          <button
            className='bg-white text-gray-900 hover:bg-blue-700 w-full py-2 px-4 rounded'
            onClick={() => setSelectedTab('Create')}
          >
            Create Complaint
          </button>
        </div>
        {selectedTab === 'Complaints' && (
          <section className='md:container md:mx-auto flex flex-col items-center mt-4 col-span-4 w-80'>
            <div className='flex items-center space-x-2 pb-4'>
              <Complaints />
            </div>
          </section>
        )}
        {selectedTab === 'Create' && (
          <section className='md:container md:mx-auto flex flex-col items-center mt-4 col-span-4 w-80'>
            <div className='flex items-center space-x-2 pb-4'>
              <CreateComplaint />
            </div>
          </section>
        )}
      </div>
    </>
  );
}

export default RenterPage;
