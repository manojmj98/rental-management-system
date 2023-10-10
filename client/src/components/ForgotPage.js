import '../App.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForgotMutation } from '../slices/userApiSlice';
import { toast } from 'react-toastify';
import NavBar from './common/NavBar';

function ForgotPage() {

    const navigate = useNavigate();

    const [show, setShow] = useState('');
    const [email, setEmail] = useState('');

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);


    return (
        <div className="bg-black h-screen flex flex-col">

            <NavBar />


            <main className="container mx-auto flex justify-center items-center flex-grow">
                <div style={{display: !show ? "block" : "none"}}className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-md">
                    <button
                        onClick={() => setShow('Email')}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
                    >Email Reset</button>\
                    <button
                        onClick={() => setShow('Question')}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
                    >Security Question Reset</button>
                </div>

                <EmailReset status={show} navigate={navigate} email={email} setEmail={setEmail}/>
                <QuestionReset status={show} navigate={navigate} email={email} setEmail={setEmail}/>

            </main>

        </div>
    );
}

function QuestionReset(props) {

    const submitHandler = async (e) => {
        e.preventDefault()
    }

    return (
        <div className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-md"
        style={{display: props.status === 'Question' ? 'block' : 'none' }}>
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
                        value={props.email}
                        onChange={ev => props.setEmail(ev.target.value)}
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
                If there is an account associated with this email we will show the security questions.
            </p>
        </div>
    )
}

function EmailReset(props) {

    const [forgot] = useForgotMutation();

    const navigate = props.navigate;

    const submitHandler = async (e) => {
        e.preventDefault()
        props.setEmail('');
        try {
            const res = await forgot({ email: props.email }).unwrap();
            toast.info("Email Sent");
            navigate("/")
        } catch (error) {
            toast.error(error?.data?.error || error)
        }
    }

    return (
        <div className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-md"
        style={{display: props.status === 'Email' ? 'block' : 'none' }}>
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
                        value={props.email}
                        onChange={ev => props.setEmail(ev.target.value)}
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
    )
}

export default ForgotPage;
