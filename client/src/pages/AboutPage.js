import React from 'react';
import { Link } from 'react-router-dom';

function AboutPage() {
    return (
        <div className="bg-black h-screen flex flex-col">
            {/* Header Section */}
            <header className="p-4 flex justify-between items-center">
                <a href="/" className="flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="white"
                        className="w-10 h-10"
                    >
                    </svg>
                    <span className="font-bold text-2xl text-white">BotBazaar</span>
                </a>
                {/* Navigation Links */}
                <div className="flex items-center space-x-4">
                    <a href="/" className="text-gray-300 hover:text-white font-medium">
                        Home
                    </a>
                    <a href="/about" className="text-gray-300 hover:text-white font-medium">
                        About
                    </a>
                    <a href="/contact" className="text-gray-300 hover:text-white font-medium">
                        Contact
                    </a>
                </div>
            </header>

            {/* About Section */}
            <main className="container mx-auto flex justify-center items-center flex-grow">
                <div className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-md">
                    {/* Title */}
                    <h2 className="text-4xl font-semibold text-white mb-4">
                        About BotBazaar
                    </h2>
                    {/* Description */}
                    <p className="text-gray-300 text-lg mb-6">
                        BotBazaar is a leading platform for robot rentals. We provide a
                        wide range of robotic solutions for various industries and
                        applications.
                    </p>
                    {/* Call to Action */}
                    <Link
                        to="/register"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full text-center block transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Get Started
                    </Link>
                </div>
            </main>

            {/* Footer Section */}
            <footer className="py-4 text-center text-gray-300">
                &copy; {new Date().getFullYear()} BotBazaar. All rights reserved.
            </footer>
        </div>
    );
}

export default AboutPage;
