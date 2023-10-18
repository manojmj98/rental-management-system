import React, { useState, useEffect } from "react";
import NavBar from "../common/NavBar";
import Card from "../common/Card";
import { useGetProductsMutation } from "../../slices/userApiSlice";
import { Link } from "react-router-dom";

function RenterDashboard() {
    const [robots, setRobots] = useState(null);
    const [getProducts, { data }] = useGetProductsMutation();

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        if (data) {
            setRobots(data.products);
        }
    }, [data]);

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
                    {robots &&
                        robots.map((robot) => (
                            <Link to={`/renter/${robot._id}`} key={robot._id}>
                                <div className="bg-gray-100 rounded-lg shadow-md p-4">
                                    {/* Robot Image */}
                                    <img
                                        src={"https://picsum.photos/200/300"}
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
                                    {/* Rent Button */}
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded-lg w-full">
                                        Rent Now
                                    </button>
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
}

export default RenterDashboard;
