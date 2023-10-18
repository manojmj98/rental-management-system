import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetProductByIdQuery } from '../../slices/productApiSlice';

const RenterItemPage = () => {
    let { id } = useParams();

    const { data, isLoading, error } = useGetProductByIdQuery({ id });

    const [robot, setRobot] = useState(null);

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
