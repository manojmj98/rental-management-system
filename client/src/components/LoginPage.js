import '../App.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import NavBar from './common/NavBar';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setEmail('');
    setPassword('');
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res.user));
      navigate('/');
    } catch (error) {
      toast.error(error?.data?.error || error);
    }
  };

  return (
    <div className='bg-black h-screen flex flex-col'>
      <NavBar />
      {/* Login Section */}
      <main className='container mx-auto flex justify-center items-center flex-grow'>
        <div className='w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-md'>
          <h2 className='text-2xl font-semibold text-white mb-6'>
            Log In to BotBazaar
          </h2>
          <form onSubmit={submitHandler}>
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
            <div className='mb-6'>
              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full'
              >
                Log In
              </button>
            </div>
          </form>
          <p className='text-gray-300 text-sm'>
            Don't have an account?{' '}
            <Link to='/register' className='text-blue-500 hover:underline'>
              Sign up here
            </Link>
            .
          </p>
          <p className='text-gray-300 text-sm'>
            <Link to='/forgot' className='text-blue-500 hover:underline'>
              Forgot Password
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
