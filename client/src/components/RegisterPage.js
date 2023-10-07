import '../App.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NavBar from './common/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import  { useRegisterMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';


function RegisterPage() {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('MEMBER');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [register] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }

    }, [navigate, userInfo])

    async function registerUser(e) {
        e.preventDefault();
        try {
            const res = await register({ username, firstName, lastName, email, password, role }).unwrap();
            dispatch(setCredentials(res.user));
            navigate('/');
        } catch (error) {
            toast.error(error?.data?.error || error)
            console.log(error);
        }
    }

    return (
        <div className="bg-black h-screen flex flex-col">
            {/* Navbar */}
            <NavBar></NavBar>

            {/* Registration Section */}
            <main className="container mx-auto flex justify-center items-center flex-grow">
                <div className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-white mb-6">Sign Up for BotBazaar</h2>
                    <form onSubmit={ registerUser }>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-300 text-sm font-medium">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="mt-1 px-4 py-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white"
                                placeholder="username"
                                value={username}
                                onChange={ev => setUsername(ev.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="firstName" className="block text-gray-300 text-sm font-medium">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="mt-1 px-4 py-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white"
                                placeholder="Your First Name"
                                value={firstName}
                                onChange={ev => setFirstName(ev.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lastName" className="block text-gray-300 text-sm font-medium">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                className="mt-1 px-4 py-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white"
                                placeholder="Your Last Name"
                                value={lastName}
                                onChange={ev => setLastName(ev.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-300 text-sm font-medium">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="mt-1 px-4 py-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white"
                                placeholder="you@example.com"
                                value={email}
                                onChange={ev => setEmail(ev.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-300 text-sm font-medium">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="mt-1 px-4 py-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white"
                                placeholder="********"
                                value={password}
                                onChange={ev => setPassword(ev.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm font-medium" >Select the Role</label>
                                <select className="block text-gray-900 text-sm font-medium" value={role} onChange={e => setRole(e.target.value)}>
                                <option>MEMBER</option>
                                <option>MERCHANT</option>

                                </select>
                        </div>
                        {/* Add fields for any other registration data */}
                        {/* ... (Similar to the login form) */}
                        <div className="mb-6">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
                            >Sign Up</button>
                        </div>
                    </form>
                    <p className="text-gray-300 text-sm">
                        Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log in here</Link>.
                    </p>
                </div>
            </main>
        </div>
    );
}

export default RegisterPage;
