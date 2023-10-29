import '../App.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './common/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import ProfileSection from './ProfileSection';

function RegisterPage() {


  return (
    <div className='bg-black h-screen flex flex-col'>
      <NavBar />
      <ProfileSection />
    </div>
  );
}

export default RegisterPage;
