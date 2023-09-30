import '../App.css';
import { Link } from 'react-router-dom';

function LoginPage() {
    return (
        <div className="bg-black h-screen flex flex-col">
            {/* Navbar */}
            <nav className="bg-gray-900 p-4 mb-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2 text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="white"
                            className="w-10 h-10"
                        >
                            {/* Your SVG path here */}
                        </svg>
                        <span className="font-bold text-2xl">BotBazaar</span>
                    </Link>
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-gray-300 hover:text-white font-medium">
                            Home
                        </Link>
                        <Link to="/about" className="text-gray-300 hover:text-white font-medium">
                            About
                        </Link>
                        <Link to="/contact" className="text-gray-300 hover:text-white font-medium">
                            Contact
                        </Link>

                    </div>
                </div>
            </nav>

            {/* Login Section */}
            <main className="container mx-auto flex justify-center items-center flex-grow">
                <div className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-white mb-6">Log In to BotBazaar</h2>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-300 text-sm font-medium">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="mt-1 px-4 py-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white"
                                placeholder="you@example.com"
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
                            />
                        </div>
                        <div className="mb-6">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
                            >
                                Log In
                            </button>
                        </div>
                    </form>
                    <p className="text-gray-300 text-sm">
                        Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Sign up here</a>.
                    </p>
                </div>
            </main>
        </div>
    );
}

export default LoginPage;
