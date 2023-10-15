import '../App.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForgotMutation } from '../slices/userApiSlice';
import { toast } from 'react-toastify';
import NavBar from './common/NavBar';

function ForgotPage() {

    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');

    const { userInfo } = useSelector((state) => state.auth);

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);


    switch (step) {
        case 1:
            return (
                <div className="bg-black h-screen flex flex-col">
                    <NavBar />
                    <main className="container mx-auto flex justify-center items-center flex-grow">

                        <EmailForm nextStep={nextStep} email={email} setEmail={setEmail} />

                    </main>
                </div>
            );
        case 2:
            return (
                <div className="bg-black h-screen flex flex-col">

                    <NavBar />

                    <main className="container mx-auto flex justify-center items-center flex-grow">
                        <div className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold text-white mb-6">Select a Password Reset Option</h2>
                            <button
                                onClick={() => setStep(3)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
                            >Email Reset</button>\
                            <button
                                onClick={() => setStep(4)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
                            >Security Question Reset</button>\
                            <button
                                onClick={prevStep}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
                            >Back</button>
                        </div>
                    </main>
                </div>
            );
        case 3:
            return (
                <div className="bg-black h-screen flex flex-col">
                    <NavBar />
                    <main className="container mx-auto flex justify-center items-center flex-grow">

                        <EmailReset email={email} navigate={navigate} />

                    </main>
                </div>
            );
        case 4:
        default:
    }


}

function EmailForm({ nextStep, email, setEmail }) {

    const submitHandler = (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("No email provided")
        }
        else {
            nextStep();
        }
    }

    return (
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
                    >Continue</button>
                </div>
            </form>
        </div>
    )
}

function EmailReset({ email, navigate }) {

    const [forgot] = useForgotMutation();

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            await forgot({ email }).unwrap();
            toast.info("Email Sent");
            navigate("/")
        } catch (error) {
            navigate("/")
        }
    }

    return (
        <div className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-white mb-6">Forgot Password</h2>
            <form onSubmit={submitHandler}>
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
