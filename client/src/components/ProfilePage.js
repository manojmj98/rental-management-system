import '../App.css';
import React from 'react';
import NavBar from './common/NavBar';
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
