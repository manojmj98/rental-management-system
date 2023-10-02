import '../App.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './common/NavBar';
import { useResetMutation } from '../slices/userApiSlice';

function ResetPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const [reset] = useResetMutation();

    async function resetPass(e) {
        e.preventDefault();
        try {
            const res = await reset({password, confirmPassword}).unwrap();
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="bg-black h-screen flex flex-col">
            {/* Navbar */}
            <NavBar />

            {/* Registration Section */}
            <main className="container mx-auto flex justify-center items-center flex-grow">
                <div className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-white mb-6">Reset Password</h2>

                    <form onSubmit={resetPass}>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-300 text-sm font-medium">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="mt-1 px-4 py-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white"
                                placeholder="********"
                                value={password}
                                onChange={ev => setPassword(ev.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-medium">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                className="mt-1 px-4 py-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white"
                                placeholder="********"
                                value={confirmPassword}
                                onChange={ev => setConfirmPassword(ev.target.value)} />
                        </div>
                        {/* Add fields for any other registration data */}
                        {/* ... (Similar to the login form) */}
                        <div className="mb-6">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
                            >Submit</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default ResetPage;
