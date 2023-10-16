import React, { useState } from 'react';
import NavBar from './common/NavBar';
import { SECURITY_QUESTIONS1, SECURITY_QUESTIONS2, SECURITY_QUESTIONS3 } from '../constants/constants';
import { useCreateQuestionsMutation } from '../slices/userApiSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SecurityQuestionPage(props) {
  const [q1, setQ1] = useState(SECURITY_QUESTIONS1.Question_1);
  const [q2, setQ2] = useState(SECURITY_QUESTIONS2.Question_1);
  const [q3, setQ3] = useState(SECURITY_QUESTIONS3.Question_1);
  const [q1a, setQ1a] = useState('');
  const [q2a, setQ2a] = useState('');
  const [q3a, setQ3a] = useState('');

  const [questions] = useCreateQuestionsMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await questions({ q1, q1a, q2, q2a, q3, q3a }).unwrap();
      navigate('/');
    } catch (error) {
      toast.error(error?.data?.error || error);
    }
  };

  return (
    <div className='bg-black h-screen flex flex-col'>
      {/* Navbar */}
      <NavBar />

      {/* Registration Section */}
      <main className='container mx-auto flex justify-center items-center flex-grow'>
        <div className='w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-md'>
          <h2 className='text-2xl font-semibold text-white mb-6'>
            Security Questions
          </h2>
          <form onSubmit={submitHandler}>
            <div className='mb-4'>
              <label
                htmlFor='username'
                className='block text-gray-300 text-sm font-medium'
              >
                Question 1
              </label>
              <select
                className='block text-gray-900 text-sm font-medium'
                value={q1}
                onChange={(e) => setQ1(e.target.value)}
              >
                {Object.values(SECURITY_QUESTIONS1).map((question) => (
                  <option>{question}</option>
                ))}
              </select>
              <input
                type='text'
                className='mt-1 px-4 py-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white'
                placeholder='Answer'
                value={q1a}
                onChange={(ev) => setQ1a(ev.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='username'
                className='block text-gray-300 text-sm font-medium'
              >
                Question 2
              </label>
              <select
                className='block text-gray-900 text-sm font-medium'
                value={q2}
                onChange={(e) => setQ2(e.target.value)}
              >
                {Object.values(SECURITY_QUESTIONS2).map((question) => (
                  <option>{question}</option>
                ))}
              </select>
              <input
                type='text'
                className='mt-1 px-4 py-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white'
                placeholder='Answer'
                value={q2a}
                onChange={(ev) => setQ2a(ev.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='username'
                className='block text-gray-300 text-sm font-medium'
              >
                Question 3
              </label>
              <select
                className='block text-gray-900 text-sm font-medium'
                value={q3}
                onChange={(e) => setQ3(e.target.value)}
              >
                {Object.values(SECURITY_QUESTIONS3).map((question) => (
                  <option>{question}</option>
                ))}
              </select>
              <input
                type='text'
                className='mt-1 px-4 py-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white'
                placeholder='Answer'
                value={q3a}
                onChange={(ev) => setQ3a(ev.target.value)}
              />
            </div>
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
        </div>
      </main>
    </div>
  );
};

export default SecurityQuestionPage;
