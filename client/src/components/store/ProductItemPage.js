import React from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../common/NavBar';

// Sample robot data (replace with actual data retrieval logic)
const robots = [
    {
        id: 1,
        name: 'Robot 1',
        description: 'This is Robot 1. It can do amazing things.',
        price: 50,
        imageUrl: 'https://via.placeholder.com/150',
        specifications: {
            dimensions: '24" x 12" x 8"',
            weight: '10 kg',
            payloadCapacity: '20 kg',
            batteryLife: '8 hours',
            operationalRange: '100 meters',
            sensors: 'LiDAR, Camera, IMU',
            compatibility: 'Python, ROS',
            additionalFeatures: 'Auto-charging, Remote Control',
        },
    },
    // Add more robot objects as needed
];

const RobotDetailsPage = () => {
    // Retrieve the robot ID from the URL parameter
    const { id } = useParams();

    // Find the robot with the matching ID
    const robot = robots.find((robot) => robot.id === parseInt(id));

    // Check if the robot exists
    if (!robot) {
        return <div>Robot not found</div>;
    }

    // Render the robot details
    return (
        <div className="bg-white h-screen flex flex-col">
            {/* Navbar */}
            <NavBar className="bg-white" />

            {/* Robot Details Section */}
            <section className="container mx-auto mt-8 p-4">
                <div className="max-w-3xl mx-auto">
                    {/* Robot Image */}
                    <img src={robot.imageUrl} alt={robot.name} className="w-full mb-4" />
                    {/* Robot Title */}
                    <h2 className="text-3xl font-semibold text-black mb-2">{robot.name}</h2>
                    {/* Robot Description */}
                    <p className="text-gray-700 mb-4">{robot.description}</p>
                    {/* Specifications Section */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-black mb-2">Specifications</h3>
                        <ul className="list-disc pl-6">
                            <li>Dimensions: {robot.specifications.dimensions}</li>
                            <li>Weight: {robot.specifications.weight}</li>
                            <li>Payload Capacity: {robot.specifications.payloadCapacity}</li>
                            <li>Battery Life: {robot.specifications.batteryLife}</li>
                            <li>Operational Range: {robot.specifications.operationalRange}</li>
                            <li>Sensors: {robot.specifications.sensors}</li>
                            <li>Compatibility: {robot.specifications.compatibility}</li>
                            <li>Additional Features: {robot.specifications.additionalFeatures}</li>
                        </ul>
                    </div>
                    {/* Robot Price */}
                    <p className="text-gray-700 font-bold">Price: ${robot.price} per day</p>
                    {/* Rent Button */}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded-lg w-full">
                        Rent Now
                    </button>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="py-4 text-center text-gray-700">
                &copy; {new Date().getFullYear()} BotBazaar. All rights reserved.
            </footer>
        </div>
    );
};

export default RobotDetailsPage;
