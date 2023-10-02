import '../App.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import  { useForgotMutation } from '../slices/userApiSlice';

function ForgotPage() {
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const [forgot] = useForgotMutation();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);


    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await forgot({ email }).unwrap();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="bg-black h-screen flex flex-col">

            {/* Login Section */}
            <main className="container mx-auto flex justify-center items-center flex-grow">
                <div className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-white mb-6">Forgot Password</h2>
                    <form onSubmit={submitHandler}>
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
                        <div className="mb-6">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
                                >Submit</button>
                        </div>
                    </form>
                    <p className="text-gray-300 text-sm">
                        If there is an account associated with this email you will be sent a password reset link.
                    </p>
                </div>
            </main>
        </div>
    );
}

export default ForgotPage;
