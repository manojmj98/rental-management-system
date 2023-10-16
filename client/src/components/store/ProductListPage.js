import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../common/NavBar';

const RobotListingPage = () => {

    // full robot schema
    // {
    //     "id": "unique_identifier",
    //     "name": "Robot Name",
    //     "description": "Description of the robot, its capabilities, and use cases.",
    //     "type": "Type or category of the robot (e.g., industrial, service, home)",
    //     "model": "Robot model or series (if applicable)",
    //     "manufacturer": "Robot manufacturer's name",
    //     "yearOfManufacture": "Year when the robot was manufactured",
    //     "availability": "Availability status (e.g., available, rented, out of service)",
    //     "pricePerDay": "Price per day for renting the robot",
    //     "pricePerWeek": "Price per week for renting the robot",
    //     "pricePerMonth": "Price per month for renting the robot",
    //     "imageUrl": "URL to the robot's image",
    //     "specifications": {
    //       "dimensions": "Robot dimensions (e.g., height, width, length)",
    //       "weight": "Robot weight",
    //       "payloadCapacity": "Maximum payload capacity",
    //       "batteryLife": "Battery life (if applicable)",
    //       "operationalRange": "Operational range (if applicable)",
    //       "sensors": "List of sensors and their capabilities",
    //       "compatibility": "Compatibility with programming languages or software",
    //       "additionalFeatures": "List of additional features or accessories"
    //     }
    //   }

    const robots = [
        {
            id: 1,
            name: 'Robot 1',
            description: 'This is Robot 1. It can do amazing things.',
            price: 50,
            imageUrl:
                'https://via.placeholder.com/150',
        },
        {
            id: 2,
            name: 'Robot 2',
            description: 'Robot 2 is here to help you with your tasks.',
            price: 65,
            imageUrl:
                'https://via.placeholder.com/150',
        },
        {
            id: 3,
            name: 'Robot 3',
            description: 'Robot 3 is designed for industrial automation.',
            price: 80,
            imageUrl:
                'https://via.placeholder.com/150',
        },
        {
            id: 4,
            name: 'Robot 4',
            description: 'Robot 4 is a friendly companion for your home.',
            price: 45,
            imageUrl:
                'https://via.placeholder.com/150',
        },
        {
            id: 5,
            name: 'Robot 5',
            description: 'Robot 5 excels in research and development tasks.',
            price: 95,
            imageUrl:
                'https://via.placeholder.com/150',
        },
        {
            id: 6,
            name: 'Robot 6',
            description: 'Robot 6 is built for outdoor exploration.',
            price: 75,
            imageUrl:
                'https://via.placeholder.com/150',
        },
    ];


    return (
        <div className="bg-white h-screen flex flex-col">
            {/* Navbar */}
            <NavBar className="bg-white" />

            {/* Robot Listing Section */}
            <section className="container mx-auto flex flex-col items-center mt-8">
                <h3 className="text-3xl font-semibold text-black mb-6">
                    Available Robots for Rent
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {robots.map((robot) => (
                        <Link to={`/renter/${robot.id}`}>
                            <div
                                className="bg-gray-100 rounded-lg shadow-md p-4"
                                key={robot.id}
                            >
                                {/* Robot Image */}
                                <img
                                    src={robot.imageUrl}
                                    alt={robot.name}
                                    className="w-32 h-32 mx-auto mb-4"
                                />
                                {/* Robot Title */}
                                <h4 className="text-xl font-semibold text-black mb-2">
                                    {robot.name}
                                </h4>
                                {/* Robot Description */}
                                <p className="text-gray-700">{robot.description}</p>
                                {/* Robot Price */}
                                <p className="text-gray-700 font-bold mt-2">
                                    Price: ${robot.price} per day
                                </p>
                                {/* Rent Button
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded-lg w-full">
                                    Rent Now
                                </button> */}
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Footer Section */}
            <footer className="py-4 text-center text-gray-700">
                &copy; {new Date().getFullYear()} BotBazaar. All rights reserved.
            </footer>
        </div>
    );
};

export default RobotListingPage;
