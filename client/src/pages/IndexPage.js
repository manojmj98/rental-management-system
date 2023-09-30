import React from 'react';
import { Link } from 'react-router-dom';
import Carousal from './Carousel'

const carouselData = [
    {
        src: 'https://images.pexels.com/photos/2085832/pexels-photo-2085832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        alt: 'Image 1',
    },
    {
        src: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/04/14/12/c3po-red-arm.jpg?quality=75&width=990&crop=3%3A2%2Csmart&auto=webp',
        alt: 'Image 2',
    },
];

function LandingPage() {
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
                        {/* Sign Up Button */}
                        <Link to="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="container mx-auto flex justify-center items-center flex-grow">
                <div className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-md">
                    {/* BotBazaar Title */}
                    <div className="mb-4 text-center">
                        <h2 className="text-4xl font-semibold text-white">
                            Welcome to BotBazaar
                        </h2>
                    </div>
                    {/* Description */}
                    <p className="text-gray-300 text-lg mb-4">
                        Rent robots for your business or personal projects. Explore our
                        wide range of robotic solutions.
                    </p>
                    {/* Search Bar */}
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Search for robots..."
                            className="px-4 py-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white"
                        />
                    </div>
                    {/* Call to Action */}
                    <Link
                        to="/register"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full text-center block transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Search
                    </Link>
                </div>
            </section>

            {/* Carousal Section */}
            <section className="container mx-auto flex justify-center items-center flex-grow mt-8">
                <Carousal data={carouselData} />
            </section>

            {/* Features Section */}
            <section className="bg-gray-800 py-12">
                <div className="container mx-auto text-center">
                    <h3 className="text-3xl font-semibold text-white mb-6">
                        Why Choose BotBazaar?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Feature 1 */}
                        <div className="p-4 bg-gray-900 rounded-lg shadow-md">
                            {/* Icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-24 h-24 mx-auto"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                                />
                            </svg>
                            {/* Feature Title */}
                            <h4 className="text-xl font-semibold text-white mb-2">
                                Cutting-Edge Technology
                            </h4>
                            {/* Feature Description */}
                            <p className="text-gray-300">
                                Our robots are equipped with the latest technology to
                                meet your needs.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-4 bg-gray-900 rounded-lg shadow-md">
                            {/* Icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-24 h-24 mx-auto"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                                />
                            </svg>

                            {/* Feature Title */}
                            <h4 className="text-xl font-semibold text-white mb-2">
                                Flexible Rental Options
                            </h4>
                            {/* Feature Description */}
                            <p className="text-gray-300">
                                Choose from short-term or long-term rental plans.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-4 bg-gray-900 rounded-lg shadow-md">
                            {/* Icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-24 h-24 mx-auto"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                                />
                            </svg>
                            {/* Feature Title */}
                            <h4 className="text-xl font-semibold text-white mb-2">
                                Expert Support
                            </h4>
                            {/* Feature Description */}
                            <p className="text-gray-300">
                                Our team of experts is here to assist you at every step.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="py-4 text-center text-gray-300">
                &copy; {new Date().getFullYear()} BotBazaar. All rights reserved.
            </footer>
        </div>
    );
}

export default LandingPage;