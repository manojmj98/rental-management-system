import React from 'react';
import '../App.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

function ProfileSection({ page = true }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const [update] = useUpdateMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setFirstName(userInfo.firstName);
    setLastName(userInfo.lastName);
    setEmail(userInfo.email);
  }, [userInfo.firstName, userInfo.lastName, userInfo.email]);

  async function registerUser(e) {
    e.preventDefault();
    try {
      const res = await update({
        _id: userInfo._id,
        firstName,
        lastName,
        email,
      }).unwrap();
      dispatch(setCredentials(res));
    } catch (error) {
      toast.error(error?.data?.error || error);
    }
  }
  return (
    <main
      className={`container mx-auto flex justify-center items-center flex-grow`}
    >
      <div
        className={`w-full max-w-md p-6 ${
          page ? 'bg-gray-900' : 'bg-gray-100'
        } rounded-lg shadow-md`}
      >
        <h2
          className={`text-2xl font-semibold ${
            page ? 'text-white' : 'text-gray-900'
          } mb-6`}
        >
          Profile
        </h2>

        <form onSubmit={registerUser}>
          <div className='mb-4'>
            <label
              htmlFor='firstName'
              className={`block ${
                page ? 'text-gray-300' : 'text-gray-900'
              } text-gray-300 text-sm font-medium`}
            >
              First Name
            </label>
            <input
              type='text'
              id='firstName'
              name='firstName'
              className={`mt-1 px-4 py-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                page ? 'bg-gray-900' : 'bg-white'
              } ${page ? 'text-white' : 'text-black'}`}
              placeholder='Your First Name'
              value={firstName}
              onChange={(ev) => setFirstName(ev.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='lastName'
              className={`block ${
                page ? 'text-gray-300' : 'text-gray-900'
              } text-gray-300 text-sm font-medium`}
            >
              Last Name
            </label>
            <input
              type='text'
              id='lastName'
              name='lastName'
              className={`mt-1 px-4 py-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                page ? 'bg-gray-900' : 'bg-white'
              } ${page ? 'text-white' : 'text-black'}`}
              placeholder='Your Last Name'
              value={lastName}
              onChange={(ev) => setLastName(ev.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className={`block ${
                page ? 'text-gray-300' : 'text-gray-900'
              } text-gray-300 text-sm font-medium`}
            >
              Email Address
            </label>
            <input
              type='email'
              id='email'
              name='email'
              className={`mt-1 px-4 py-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                page ? 'bg-gray-900' : 'bg-white'
              } ${page ? 'text-white' : 'text-black'}`}
              placeholder='you@example.com'
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='Role'
              className={`block ${
                page ? 'text-gray-300' : 'text-gray-900'
              } text-gray-300 text-sm font-medium`}
            >
              Role
            </label>
            <input
              type='role'
              id='role'
              name='role'
              className={`mt-1 px-4 py-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                page ? 'bg-gray-900' : 'bg-white'
              } ${page ? 'text-white' : 'text-black'}`}
              value={userInfo.role}
              disabled={true}
            />
          </div>
          {/* Add fields for any other registration data */}
          {/* ... (Similar to the login form) */}
          <div className='mb-6'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full'
            >
              Submit
            </button>
          </div>
        </form>
        <p
          className={`block ${
            page ? 'text-gray-300' : 'text-gray-900'
          } text-gray-300 text-sm font-medium`}
        >
          <Link to='/reset' className='text-blue-500 hover:underline'>
            Reset Password
          </Link>
        </p>
        <p
          className={`block ${
            page ? 'text-gray-300' : 'text-gray-900'
          } text-gray-300 text-sm font-medium`}
        >
          <Link
            to='/SecurityQuestions'
            className='text-blue-500 hover:underline'
          >
            Update/Add Security Questions
          </Link>
        </p>
      </div>
    </main>
  );
}

export default ProfileSection;
