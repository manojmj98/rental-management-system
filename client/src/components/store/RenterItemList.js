// import React, { useState, useEffect } from "react";
// import NavBar from "../common/NavBar";
// import Card from "../common/Card";
// import { useGetProductByIdMutation } from "../../slices/userApiSlice";
// import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom";

// function RenterItem() {
// const [robot, setRobot] = useState(null);
// const { id } = useParams();
// const { getProductById, data } = useGetProductByIdMutation(id);


// useEffect(() => {
// getProductById();
// }, []);

// useEffect(() => {
// if (data) {
// setRobot(data);
// }
// }, [data]);

// console.log("id: ", id);
// console.log("data: ", data);

// if (!robot) {
// return <div>Loading...</div>;
// }

// return (
// <div className="bg-white h-screen flex flex-col">
// {/* Navbar */}
// <NavBar className="bg-white" />

// {/* Robot Details Section */}
// <section className="container mx-auto mt-8 p-4">
// <div className="max-w-3xl mx-auto">
// {/* Robot Image */}
// <img src={robot.imageUrl} alt={robot.name} className="w-full mb-4" />
// {/* Robot Title */}
// <h2 className="text-3xl font-semibold text-black mb-2">{robot.name}</h2>
// {/* Robot Description */}
// <p className="text-gray-700 mb-4">{robot.description}</p>
// {/* Robot Price */}
// <p className="text-gray-700 font-bold">Price: ${robot.price} per day</p>
// {/* Rent Button */}
// <button className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded-lg w-full">
// Rent Now
// </button>
// </div>
// </section>

// {/* Footer Section */}
// <footer className="py-4 text-center text-gray-700">
// &copy; {new Date().getFullYear()} BotBazaar. All rights reserved.
// </footer>
// </div>
// );
// }

// export default RenterItem;


import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    useGetProductByIdMutation,
} from '../../slices/userApiSlice';
import { toast } from 'react-toastify';

const RenterItemPage = () => {
    const [getProductById, { data }] = useGetProductByIdMutation();
    let { id } = useParams();
    const [robot, setRobot] = useState(null);

    React.useEffect(() => {
        let body = { id: id };
        getProductById(body);
    }, [id, getProductById]);
    React.useEffect(() => {
        if (data) {
            setRobot(data);
        }
    }, [data]);

    return (
        robot && (
            <div className='container mx-auto mt-8'>
                <h2 className='text-2xl font-bold mb-4'>{robot.name}</h2>
                <img
                    src='https://picsum.photos/200/300'
                    alt={robot.name}
                    className='mb-4 rounded-lg'
                />
                <p className='text-gray-700 mb-4'>{robot.description}</p>
                <p className='text-2xl font-bold text-green-600'>${robot.price}</p>
            </div>
        )
    );
};

export default RenterItemPage;
