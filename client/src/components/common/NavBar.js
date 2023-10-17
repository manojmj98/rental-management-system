import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../slices/userApiSlice';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../slices/authSlice';
import { ROLE } from '../../constants/constants';
import { FiHome } from 'react-icons/fi';
import { FaStore } from 'react-icons/fa';

function NavBar() {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logOutApi] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logOutApi().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className='bg-gray-900 p-4 mb-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to='/' className='flex items-center gap-2 text-white'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2}
            stroke='white'
            className='w-10 h-10'
          >
            {/* Your SVG path here */}
          </svg>
          <span className='font-bold text-2xl'>BotBazaar</span>
        </Link>
        <div className='flex items-center space-x-4'>
          <Link to='/' className='text-gray-300 hover:text-white font-medium'>
            Home
          </Link>
          <Link
            to='/about'
            className='text-gray-300 hover:text-white font-medium'
          >
            About
          </Link>
          <Link
            to='/contact'
            className='text-gray-300 hover:text-white font-medium'
          >
            Contact
          </Link>
          {userInfo ? (
            userInfo.role === ROLE.Merchant ? (
              <>
                <Link
                  to='/profile'
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300'
                >
                  Profile
                </Link>
                <Link to='/owner' className='inline-flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300'>
                  <FiHome className='mr-2' /> My Dashboard
                </Link>
                <Link
                  onClick={logoutHandler}
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300'
                >
                  Sign Out
                </Link>
              </>

            ) : (
              <>
                <Link
                  to='/profile'
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300'
                >
                  Profile
                </Link>
                <Link to='/renter' className='inline-flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300'>
                  <FaStore className='mr-2' /> Product Catalog
                </Link>
                <Link
                  onClick={logoutHandler}
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300'
                >
                  Sign Out
                </Link>
              </>
            )
          ) : (
            <>
              <Link
                to='/login'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300'
              >
                Sign In
              </Link>
              <Link
                to='/register'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300'
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
