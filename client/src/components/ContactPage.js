import React from 'react';
import NavBar from './common/NavBar';
import { Link } from 'react-router-dom';

function ContactPage() {
  return (
    <div className='bg-black h-screen flex flex-col'>
      <NavBar />

      {/* Contact Section */}
      <main className='container mx-auto flex justify-center items-center flex-grow'>
        <div className='w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-md'>
          {/* Title */}
          <h2 className='text-4xl font-semibold text-white mb-4'>Contact</h2>
          {/* Description */}
          <p className='text-gray-300 text-lg mb-6'>
            Login and reach out to us on the chat feature for any inquiries.
          </p>
          {/* Call to Action */}
          <Link
            to='/login'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full text-center block transition duration-300 ease-in-out transform hover:scale-105'
          >
            Login
          </Link>
        </div>
      </main>

      {/* Footer Section */}
      <footer className='py-4 text-center text-gray-300'>
        &copy; {new Date().getFullYear()} BotBazaar. All rights reserved.
      </footer>
    </div>
  );
}

export default ContactPage;
