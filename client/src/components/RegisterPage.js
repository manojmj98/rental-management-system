import '../App.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NavBar from './common/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('MEMBER');
  const [street,setStreet] = useState('')
  const [city,setCity] = useState('')
  const [state,setStatee] = useState('')
  const [country,setCountry] = useState('')
  const [latitude,setLatitude] = useState('')
  const [longitude,setLongitude] = useState('')


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  async function registerUser(e) {
    e.preventDefault();
    try {
      const address = `${street}, ${city}, ${state}, ${country}`;
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
          )}&key=AIzaSyAIGULR3p6qn-h-AStpV91ZSN-w-WlV98w`
        );
  
        if (!response.ok) {
          throw new Error("Network error");
        }
        const data = await response.json();
  
        if (data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setLatitude(lat);
          setLongitude(lng);

        } else {
          throw new Error("No results found");
        }

      const res = await register({
        username,
        firstName,
        lastName,
        email,
        password,
        role,
        street,
        city,
        state,
        country,
        latitude,
        longitude
      }).unwrap();
      dispatch(setCredentials(res.user));
      navigate('/');
    } catch (error) {
      console.log(error)
      toast.error(error?.data?.error || "Enter Valid Address");
    }
  }

  return (
    <div className='bg-black flex flex-col'>
      {/* Navbar */}
      <NavBar></NavBar>

      {/* Registration Section */}
      <main className='container mx-auto flex justify-center items-center flex-grow'>
        <div className='w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-md'>
          <h2 className='text-2xl font-semibold text-white mb-6'>
            Sign Up for BotBazaar
          </h2>
          <form onSubmit={registerUser}>
            <div className='mb-4'>
              <label
                htmlFor='username'
                className='block text-gray-300 text-sm font-medium'
              >
                Username
              </label>
              <input
                type='text'
                id='username'
                name='username'
                className='mt-1 px-4 py-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white'
                placeholder='username'
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='firstName'
                className='block text-gray-300 text-sm font-medium'
              >
                First Name
              </label>
              <input
                type='text'
                id='firstName'
                name='firstName'
                className='mt-1 px-4 py-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white'
                placeholder='Your First Name'
                value={firstName}
                onChange={(ev) => setFirstName(ev.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='lastName'
                className='block text-gray-300 text-sm font-medium'
              >
                Last Name
              </label>
              <input
                type='text'
                id='lastName'
                name='lastName'
                className='mt-1 px-4 py-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white'
                placeholder='Your Last Name'
                value={lastName}
                onChange={(ev) => setLastName(ev.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='email'
                className='block text-gray-300 text-sm font-medium'
              >
                Email Address
              </label>
              <input
                type='email'
                id='email'
                name='email'
                className='mt-1 px-4 py-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white'
                placeholder='you@example.com'
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='password'
                className='block text-gray-300 text-sm font-medium'
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                className='mt-1 px-4 py-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white'
                placeholder='********'
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-300 text-sm font-medium'>
                Select the Role
              </label>
              <select
                className='block text-gray-900 text-sm font-medium'
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option>MEMBER</option>
                <option>MERCHANT</option>
              </select>
            </div>
            <div className='mb-4'>
              <label
                htmlFor='street'
                className='block text-gray-300 text-sm font-medium'
              >
                Street
              </label>
              <input
                type='street'
                id='street'
                name='street'
                className='mt-1 px-4 py-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white'
                placeholder='Enter the Street'
                value={street}
                onChange={(ev) => setStreet(ev.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='city'
                className='block text-gray-300 text-sm font-medium'
              >
                City
              </label>
              <input
                type='city'
                id='city'
                name='city'
                className='mt-1 px-4 py-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white'
                placeholder='Enter the city'
                value={city}
                onChange={(ev) => setCity(ev.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='State'
                className='block text-gray-300 text-sm font-medium'
              >
                State
              </label>
              <input
                type='state'
                id='state'
                name='state'
                className='mt-1 px-4 py-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white'
                placeholder='Enter state'
                value={state}
                onChange={(ev) => setStatee(ev.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='country'
                className='block text-gray-300 text-sm font-medium'
              >
                Country
              </label>
              <input
                type='country'
                id='country'
                name='country'
                className='mt-1 px-4 py-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white'
                placeholder='Enter Country'
                value={country}
                onChange={(ev) => setCountry(ev.target.value)}
              />
            </div>
            <div className='mb-6'>
              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full'
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className='text-gray-300 text-sm'>
            Already have an account?{' '}
            <Link to='/login' className='text-blue-500 hover:underline'>
              Log in here
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  );
}

export default RegisterPage;
